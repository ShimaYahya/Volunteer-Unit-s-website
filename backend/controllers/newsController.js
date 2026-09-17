var models = require('../models');
var authService = require('../services/auth');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
var {newTransformer, newsTransformer} = require('../transform/newsPhoto');

// عرض جميع المشاريع
exports.index = function (req, res, next) {
    var response = {
        success: false,
        message: [],
        data: []
    }
    models.News.findAll({})
        .then(news => {
            if (Array.isArray(news) && news.length) {
                response.data = newsTransformer(news);
                response.success = true;
            } else {
                response.message.push("No news found");
            }
            res.send(response);
        }).catch(error => {
            console.error(error);
            response.message.push("Error fetching news");
            res.status(500).send(response);
        });
}

// إضافة مشروع جديد مع صورة
exports.add = async function (req, res, next) {

    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    var response = {
        success: true,
        message: [],
        data: {}
    }
    
    // التحقق من صلاحية الأدمن
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        response.message.push("Authorization token required");
        response.success = false;
        return res.status(401).send(response);
    }
    
    try {
        const isVerified = await authService.verifyAdmin(token);
        if (!isVerified) {
            response.message.push("Unauthorized access");
            response.success = false;
            return res.status(403).send(response);
        }

        // التحقق من الحقول المطلوبة
        const requiredFields = [
            'news_title', 'description'
        ];
        
        const missingFields = [];
        requiredFields.forEach(field => {
            if (!req.body[field]) missingFields.push(field);
        });
        
        if (missingFields.length) {
            response.message.push(`Missing required fields: ${missingFields.join(', ')}`);
            response.success = false;
            return res.status(400).send(response);
        }

        // معالجة الصورة
        let photoPath = null;
        if (req.file) {
            // حفظ الصورة في مجلد uploads
            photoPath =  req.file.filename;
        }

        // إنشاء المشروع
        const newNews = await models.News.create({
            news_title: req.body.news_title,
            description: req.body.description || null,
            photo: photoPath // حفظ مسار الصورة
        });

        console.log("-----------------------------------------",newNews)

        response.data = newNews;
        response.message.push("new created successfully");
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        response.success = false;
        response.message.push("Error creating new");
        res.status(500).send(response);
    }
}

// عرض مشروع بواسطة ID
exports.show = async function (req, res, next) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    
    const id = req.params.id;
    if (isNaN(id)) {
        response.message.push("Invalid oneNew ID");
        return res.status(400).send(response);
    }

    try {
        const oneNew = await models.News.findByPk(id);
        if (oneNew) {
            response.success = true;
            response.data = newTransformer(oneNew);
            res.send(response);
        } else {
            response.message.push("oneNew not found");
            res.status(404).send(response);
        }
    } catch (error) {
        console.error(error);
        response.message.push("Error fetching oneNew");
        res.status(500).send(response);
    }
}

// تحديث المشروع مع صورة
exports.update = async function (req, res, next) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    
    // التحقق من صلاحية الأدمن
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        response.message.push("Authorization token required");
        return res.status(401).send(response);
    }
    
    try {
        const isVerified = await authService.verifyAdmin(token);
        if (!isVerified) {
            response.message.push("Unauthorized access");
            return res.status(403).send(response);
        }

        const newId = req.params.id;
        if (isNaN(newId)) {
            response.message.push("Invalid new ID");
            return res.status(400).send(response);
        }

        const OneNew = await models.News.findByPk(newId);
        if (!OneNew) {
            response.message.push("new not found");
            return res.status(404).send(response);
        }

        // تحديث الحقول المسموح بها
        const updatableFields = [
            'news_title', 'description'
        ];
        
        let hasUpdates = false;
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                OneNew[field] = req.body[field];
                hasUpdates = true;
            }
        });

        // تحديث الصورة إذا تم تحميل ملف جديد
        if (req.file) {
            // حذف الصورة القديمة إذا كانت موجودة
            if (OneNew.photo) {
                const oldPhotoPath = path.join(__dirname, '../uploads', OneNew.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            // حفظ الصورة الجديدة
            OneNew.photo = req.file.filename;
            hasUpdates = true;
        }

        if (!hasUpdates) {
            response.message.push("No valid fields to update");
            return res.status(400).send(response);
        }

        await OneNew.save();
        response.success = true;
        response.message.push("OneNew updated successfully");
        response.data = newTransformer(OneNew);
        res.send(response);
    } catch (error) {
        console.error(error);
        response.message.push("Error updating OneNew");
        res.status(500).send(response);
    }
}

// حذف المشروع مع الصورة
exports.delete = async function (req, res, next) {
    var response = {
        success: false,
        message: [],
        data: {}
    }
    
    // التحقق من صلاحية الأدمن
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        response.message.push("Authorization token required");
        return res.status(401).send(response);
    }
    
    try {
        const isVerified = await authService.verifyAdmin(token);
        if (!isVerified) {
            response.message.push("Unauthorized access");
            return res.status(403).send(response);
        }

        const newId = req.params.id;
        if (isNaN(newId)) {
            response.message.push("Invalid new ID");
            return res.status(400).send(response);
        }

        const oneNew = await models.News.findByPk(newId);
        if (!oneNew) {
            response.message.push("oneNew not found");
            return res.status(404).send(response);
        }

        // حذف الصورة المرتبطة
        if (oneNew.photo) {
            const photoPath = path.join(__dirname, '../public', oneNew.photo);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        await oneNew.destroy();
        response.success = true;
        response.message.push("oneNew deleted successfully");
        res.send(response);
    } catch (error) {
        console.error(error);
        response.message.push("Error deleting oneNew");
        res.status(500).send(response);
    }
}