const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/banner/banner.router')
const categoryRouter = require('../app/category/category.router')

router.use(authRouter)
router.use('/banner', bannerRouter)
router.use('/category', categoryRouter)

module.exports = router