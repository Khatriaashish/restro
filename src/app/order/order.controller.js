const foodSvc = require('../food/food.service');
const OrderRequest = require('./order.request');
const orderSvc = require('./order.service');
class OrderController{
    placeOrder = async(req, res, next)=>{
        try{
            const food = req.body.foodId;
            const qty = req.body.qty;
            const user = req.authUser._id;
            const order = (new OrderRequest()).transformSelection(food, user, qty);
            const existingOrder = await orderSvc.checkOrder(food, user);
            const response = await orderSvc.upsertOrder(existingOrder, order);
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
                result: response,
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
            if(order.status !== "new"){
                next({code: 415, message: "Order has already been processed"})
            }
            else{
                const update = await orderSvc.updateOrderStatus(orderId, 'cooking');
                res.json({
                    result: response,
                    message: "Order is being cooked"
                })
            }
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
                    result: response,
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
                result: response,
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
                    result: response,
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
                result: response,
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
                    result: response,
                    message: "Order is served"
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
                result: response,
                message: "List of paid orders"
            })
        }
        catch(except){
            next(except);
        }
    }

    getOrderDetailById = async(req, res, next)=>{
        try{
            const filter = {
                _id: req.params.orderId
            }
            if(req.authUser.role === 'customer'){
                filter = {
                    ...filter,
                    customerId: req.authUser._id
                }
            }
            const order = await orderSvc.getByFilter(filter);
            res.json({
                result: order,
                message: "Requested order info is fetched",
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