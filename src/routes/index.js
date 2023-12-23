const router = require('express').Router();
const authRouter = require('../app/auth/auth.router')
const bannerRouter = require('../app/banner/banner.router')
const categoryRouter = require('../app/category/category.router')
const foodRouter = require('../app/food/food.router')
const userRouter = require('../app/user/user.router')

router.use(authRouter)
router.use('/banner', bannerRouter)
router.use('/category', categoryRouter)
router.use('/food', foodRouter)
router.use('/user', userRouter)

module.exports = router