const router = require('express').Router();
const checkLogin = require('../../middlewares/auth.middleware');
const checkPermission = require('../../middlewares/rbac.middleware');
const validateRequest = require('../../middlewares/validate.request');
const orderCtrl = require('./order.controller');
const { selectionSchema } = require('./order.validator');

router.post('/place-order', checkLogin, checkPermission(['admin', 'customer']), orderCtrl.placeOrder);
router.get('/get-new-order', checkLogin, checkPermission(['admin', 'kitchen', 'reception']), orderCtrl.getNewOrder)
router.put('/order-cooking/:orderId', checkLogin, checkPermission(['admin', 'kitchen']), orderCtrl.orderCooking)
router.get('/get-cooking-order', checkLogin, checkPermission(['admin', 'kitchen', 'waiter', 'reception']), orderCtrl.getCookingOrder)
router.put('/order-cooked/:orderId', checkLogin, checkPermission(['admin', 'kitchen']), orderCtrl.orderCooked)
router.get('/get-cooked-order', checkLogin, checkPermission(['admin', 'kitchen', 'waiter', 'reception']), orderCtrl.getCookedOrder)
router.put('/order-served/:orderId', checkLogin, checkPermission(['admin', 'waiter']), orderCtrl.orderServed)
router.get('/get-served-order', checkLogin, checkPermission(['admin', 'waiter', 'reception']), orderCtrl.getServedOrder)
router.put('/order-completed/:orderId', checkLogin, checkPermission(['admin', 'reception']), orderCtrl.orderCompleted)
router.get('/get-paid-order', checkLogin, checkPermission(['admin', 'reception']), orderCtrl.getPaidOrder)
router.get('/get-order-detail/:customerId', checkLogin, checkPermission(['admin', 'reception']), orderCtrl.getOrderDetailByCustomerId);


module.exports = router