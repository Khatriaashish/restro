const router = require('express').Router();
const uploader = require('../../middlewares/uploader.middleware');
const validateRequest = require('../../middlewares/validate.request');
const authCtrl = require('../auth/auth.controller');
const { registerSchema } = require('./auth.validator');


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users'
    next();
}
//api
router.post('/register', dirSetup, uploader.single('image'), validateRequest(registerSchema), authCtrl.register);
router.get('/verify-token/:token', authCtrl.verifyToken);
router.post('/set-password/:token', authCtrl.setPassword);
module.exports = router