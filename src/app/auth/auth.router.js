const router = require('express').Router();
const uploader = require('../../middlewares/uploader.middleware')
const authCtrl = require('../auth/auth.controller')


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/users'
    next();
}
//api
router.post('/register', dirSetup, uploader.single('image'), authCtrl.register)

module.exports = router