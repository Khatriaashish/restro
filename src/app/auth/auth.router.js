const router = require('express').Router();
const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const validateRequest = require('../../middlewares/validate.request');
const authCtrl = require('../auth/auth.controller');
const { registerSchema, passwordSchema, loginSchema, emailSchema } = require('./auth.validator');


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users'
    next();
}
//api
router.post('/register', dirSetup, uploader.single('image'), validateRequest(registerSchema), authCtrl.register);
router.get('/verify-token/:token', authCtrl.verifyToken);
router.post('/set-password/:token', validateRequest(passwordSchema), authCtrl.setPassword);

router.post('/login', validateRequest(loginSchema), authCtrl.login);
router.get('/me', checkLogin, checkPermission(['admin', 'kitchen']), (req, res, next)=>{ res.json({result: req.authUser})})
router.post('/refresh-token', checkLogin, authCtrl.refreshToken);
router.post('/forget-password', validateRequest(emailSchema), authCtrl.forgetPassword);
router.post('/reset-password/:token', validateRequest(passwordSchema), authCtrl.resetPassword);
router.post('/logout', checkLogin, authCtrl.logout);
module.exports = router