const checkLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const checkPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate.request')
const bannerCtrl = require('./banner.controller')
const bannerSvc = require('./banner.service')
const { bannerCreateSchema } = require('./banner.validator')

const router = require('express').Router()


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/banner'
    next()
}

router.get('/home', bannerCtrl.getBannerForHome);
router.route('/')
    //create
    .post(
        checkLogin,
        checkPermission('admin'),
        dirSetup,
        uploader.single('image'),
        validateRequest(bannerCreateSchema),
        bannerCtrl.createBanner
    )

    //read all
    .get(
        checkLogin, 
        checkPermission('admin'), 
        bannerCtrl.listAllBanner)

router.route('/:id')
    //read one  
    .get(
        checkLogin,
        checkPermission('admin'),
        checkAccess(bannerSvc),
        bannerCtrl.getDetail
    )
    .put(
        checkLogin,
        checkPermission('admin'),
        checkAccess(bannerSvc),
        dirSetup,
        uploader.single('image'),
        validateRequest(bannerCreateSchema),
        bannerCtrl.editBanner
    )
    .delete(
        checkLogin,
        checkPermission('admin'),
        checkAccess(bannerSvc),
        bannerCtrl.deleteBanner
    )

module.exports = router