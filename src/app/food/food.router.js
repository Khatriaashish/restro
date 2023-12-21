const checkLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const checkPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate.request')
const foodCtrl = require('./food.controller')
const foodSvc = require('./food.service')
const { foodCreateSchema } = require('./food.validator')

const router = require('express').Router()


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/food'
    next()
}

router.get('/slug/:slug', foodCtrl.getDetailBySlug);
router.get('/home', foodCtrl.getFoodForHome);
router.route('/')
    //create
    .post(
        checkLogin,
        checkPermission('admin'),
        dirSetup,
        uploader.array('images'),
        validateRequest(foodCreateSchema),
        foodCtrl.createFood
    )

    //read all
    .get(
        checkLogin, 
        checkPermission('admin'), 
        foodCtrl.listAllFood)

//for food reviews
router.post('/:id/reviews', checkLogin, checkPermission('customer'), check-checkAccess(foodSvc), foodCtrl.createReview);

router.route('/:id')
    //read one  
    .get(
        checkLogin,
        checkPermission('admin'),
        checkAccess(foodSvc),
        foodCtrl.getDetail
    )
    .put(
        checkLogin,
        checkPermission('admin'),
        checkAccess(foodSvc),
        dirSetup,
        uploader.array('images'),
        validateRequest(foodCreateSchema),
        foodCtrl.editFood
    )
    .delete(
        checkLogin,
        checkPermission('admin'),
        checkAccess(foodSvc),
        foodCtrl.deleteFood
    )

module.exports = router