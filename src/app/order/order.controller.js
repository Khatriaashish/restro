const foodSvc = require('../food/food.service');
const OrderRequest = require('./order.request');
const orderSvc = require('./order.service');
class OrderController{
    placeOrder = async(req, res, next)=>{
        try{
            const foodId = req.body.foodId;
            const qty = req.body.qty;
            const user = req.authUser._id;
            const food = await foodSvc.getById({_id: foodId})
            console.log(food)
            const order = (new OrderRequest()).transformSelection(food, user, qty);

            const existingOrder = await orderSvc.checkOrder(food, user);
            const response = await orderSvc.createOrder(order);
            res.json({
                result: response,
                message: "Your ordered has been placed successfully"
            })
        }
        catch(except){
            next(except);
        }
    }

    getNewOrder = async(req, res, next)=>{
        try{
            const order = await orderSvc.getByFilter({status: 'new'});
            res.json({
                result: order,
                message: "List of new orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    orderCooking = async(req, res, next)=>{
        try{
            const orderId = req.params.orderId;
            const order = await orderSvc.getById({_id: orderId});
            console.log(order)
            if(order.status !== "new"){
                next({code: 415, message: "Order has already been processed"})
            }
            else{
                const update = await orderSvc.updateOrderStatus(orderId, 'cooking');
                res.json({
                    result: update,
                    message: "Order is being cooked"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    getCookingOrder = async(req, res, next)=>{
        try{
            const order = await orderSvc.getByFilter({status: 'cooking'});
            res.json({
                result: order,
                message: "List of cooking orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    orderCooked = async(req, res, next)=>{
        try{
            const orderId = req.params.orderId;
            const order = await orderSvc.getById({_id: orderId});
            if(order.status !== "cooking"){
                next({code: 415, message: "Order was not in cooking phase"})
            }
            else{
                const update = await orderSvc.updateOrderStatus(orderId, 'cooked');
                res.json({
                    result: update,
                    message: "Order is cooked"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    getCookedOrder = async(req, res, next)=>{
        try{
            const order = await orderSvc.getByFilter({status: 'cooked'});
            res.json({
                result: order,
                message: "List of cooked orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    orderServed = async(req, res, next)=>{
        try{
            const orderId = req.params.orderId;
            const order = await orderSvc.getById({_id: orderId});
            if(order.status !== "cooked"){
                next({code: 415, message: "Order was not in cooked phase"})
            }
            else{
                const update = await orderSvc.updateOrderStatus(orderId, 'served');
                res.json({
                    result: update,
                    message: "Order is served"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    getServedOrder = async(req, res, next)=>{
        try{
            const order = await orderSvc.getByFilter({status: 'served'});
            res.json({
                result: order,
                message: "List of served orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    orderCompleted = async(req, res, next)=>{
        try{
            const orderId = req.params.orderId;
            const order = await orderSvc.getById({_id: orderId});
            if(order.status !== "served"){
                next({code: 415, message: "Order was not in served phase"})
            }
            else{
                const update = await orderSvc.updateOrderStatus(orderId, 'paid');
                res.json({
                    result: update,
                    message: "Order completed"
                })
            }
        }
        catch(except){
            next(except);
        }
    }

    getPaidOrder = async(req, res, next)=>{
        try{
            const order = await orderSvc.getByFilter({status: 'paid'});
            res.json({
                result: order,
                message: "List of paid orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    getOrderDetailByCustomerId = async(req, res, next)=>{
        try{
            const filter = {
                customerId: req.params.customerId
            }
            const order = await orderSvc.getByFilter(filter);
            let GrandTotal = order.reduce((acc, item)=>acc+item.amount, 0)
            let VatAmt = order.reduce((acc, item)=>acc+item.VatAmt, 0)
            let serviceCharge = order.reduce((acc, item)=>acc+item.serviceCharge, 0)
            res.json({
                result: {
                    GrandTotal: GrandTotal,
                    VatAmt: VatAmt,
                    serviceCharge: serviceCharge,
                    orders: order
                },
                message: "Requested user's orders info is fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    
}

const orderCtrl = new OrderController()
module.exports = orderCtrl