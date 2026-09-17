const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const yemenipepoleController = require('../controllers/yemenipepoleController');
const { isAuthenticatedAdmin } = require('../middlewares/isAuthentuicated');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const acceptedFile = function (req, file, cb) {
    const acceptedMimetypes = [
        'image/jpeg',
        'image/jpg',
        'image/png'
    ]
    if (acceptedMimetypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const imgUploader = multer({
    storage: storage,
    fileFilter: acceptedFile,
    limits: { fileSize: 5000000 }
})



router.get('/', yemenipepoleController.index); 
router.post('/', isAuthenticatedAdmin, imgUploader.single('photo'), yemenipepoleController.add); 
router.get('/:id', yemenipepoleController.show); 
router.put('/:id', isAuthenticatedAdmin, imgUploader.single('photo'), yemenipepoleController.update);
router.delete('/:id', isAuthenticatedAdmin, yemenipepoleController.delete);

module.exports = router;