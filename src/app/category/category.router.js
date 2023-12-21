const checkLogin = require('../../middlewares/auth.middleware')
const checkAccess = require('../../middlewares/check-access.middleware')
const checkPermission = require('../../middlewares/rbac.middleware')
const uploader = require('../../middlewares/uploader.middleware')
const validateRequest = require('../../middlewares/validate.request')
const categoryCtrl = require('./category.controller')
const categorySvc = require('./category.service')
const { categoryCreateSchema } = require('./category.validator')

const router = require('express').Router()


const dirSetup = (req, res, next)=>{
    req.uploadDir = './public/uploads/category'
    next()
}

router.get('/slug/:slug', categoryCtrl.getDetailBySlug);
router.get('/home', categoryCtrl.getCategoryForHome);
router.route('/')
    //create
    .post(
        checkLogin,
        checkPermission('admin'),
        dirSetup,
        uploader.single('image'),
        validateRequest(categoryCreateSchema),
        categoryCtrl.createCategory
    )

    //read all
    .get(
        checkLogin, 
        checkPermission('admin'), 
        categoryCtrl.listAllCategory)

router.route('/:id')
    //read one  
    .get(
        checkLogin,
        checkPermission('admin'),
        checkAccess(categorySvc),
        categoryCtrl.getDetail
    )
    .put(
        checkLogin,
        checkPermission('admin'),
        checkAccess(categorySvc),
        dirSetup,
        uploader.single('image'),
        validateRequest(categoryCreateSchema),
        categoryCtrl.editCategory
    )
    .delete(
        checkLogin,
        checkPermission('admin'),
        checkAccess(categorySvc),
        categoryCtrl.deleteCategory
    )

module.exports = router