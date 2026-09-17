var models = require('../models');
var authService = require('../services/auth');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');
var {yemenipersonTransformer, yemenipepoleTransformer} = require('../transform/yemenipepolePhoto');

// عرض جميع المشاريع
exports.index = function (req, res, next) {
    var response = {
        success: false,
        message: [],
        data: []
    }
    models.Yemenipepole.findAll({})
        .then(yemenipepole => {
            if (Array.isArray(yemenipepole) && yemenipepole.length) {
                response.data = yemenipepoleTransformer(yemenipepole);
                response.success = true;
            } else {
                response.message.push("No yemenipepole found");
            }
            res.send(response);
        }).catch(error => {
            console.error(error);
            response.message.push("Error fetching yemenipepole");
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
            'yemeni_name', 'description'
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
        const newYemenipepole = await models.Yemenipepole.create({
            yemeni_name: req.body.yemeni_name,
            description: req.body.description || null,
            photo: photoPath // حفظ مسار الصورة
        });

        console.log("-----------------------------------------",newYemenipepole)

        response.data = newYemenipepole;
        response.message.push("new created successfully");
        res.status(201).send(response);
    } catch (error) {
        console.error(error);
        response.success = false;
        response.message.push("Error creating yemeni pepole");
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
        response.message.push("Invalid yemeni person ID");
        return res.status(400).send(response);
    }

    try {
        const yemeniperson = await models.Yemenipepole.findByPk(id);
        if (yemeniperson) {
            response.success = true;
            response.data = yemenipersonTransformer(yemeniperson);
            res.send(response);
        } else {
            response.message.push("yemeni person not found");
            res.status(404).send(response);
        }
    } catch (error) {
        console.error(error);
        response.message.push("Error fetching yemeni person");
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

        const yemenipersonId = req.params.id;
        if (isNaN(yemenipersonId)) {
            response.message.push("Invalid new ID");
            return res.status(400).send(response);
        }

        const yemeniperson = await models.Yemenipepole.findByPk(yemenipersonId);
        if (!yemeniperson) {
            response.message.push("new not found");
            return res.status(404).send(response);
        }

        // تحديث الحقول المسموح بها
        const updatableFields = [
            'yemeni_name', 'description'
        ];
        
        let hasUpdates = false;
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                yemeniperson[field] = req.body[field];
                hasUpdates = true;
            }
        });

        // تحديث الصورة إذا تم تحميل ملف جديد
        if (req.file) {
            // حذف الصورة القديمة إذا كانت موجودة
            if (yemeniperson.photo) {
                const oldPhotoPath = path.join(__dirname, '../uploads', yemeniperson.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            // حفظ الصورة الجديدة
            yemeniperson.photo = req.file.filename;
            hasUpdates = true;
        }

        if (!hasUpdates) {
            response.message.push("No valid fields to update");
            return res.status(400).send(response);
        }

        await yemeniperson.save();
        response.success = true;
        response.message.push("yemeniperson updated successfully");
        response.data = yemenipersonTransformer(yemeniperson);
        res.send(response);
    } catch (error) {
        console.error(error);
        response.message.push("Error updating yemeniperson");
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

        const yemenipersonId = req.params.id;
        if (isNaN(yemenipersonId)) {
            response.message.push("Invalid new ID");
            return res.status(400).send(response);
        }

        const yemeniperson = await models.Yemenipepole.findByPk(yemenipersonId);
        if (!yemeniperson) {
            response.message.push("yemeniperson not found");
            return res.status(404).send(response);
        }

        // حذف الصورة المرتبطة
        if (yemeniperson.photo) {
            const photoPath = path.join(__dirname, '../public', yemeniperson.photo);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        await yemeniperson.destroy();
        response.success = true;
        response.message.push("yemeniperson deleted successfully");
        res.send(response);
    } catch (error) {
        console.error(error);
        response.message.push("Error deleting yemeniperson");
        res.status(500).send(response);
    }
}