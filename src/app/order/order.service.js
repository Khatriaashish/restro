const OrderModel = require("./order.model");

class OrderService{
    checkOrder = async(foodId, customerId)=>{
        try{
            let order = await OrderModel.findOne({
                foodId: foodId,
                customerId: customerId,
                status: 'new'||'cancelled'||'cooking'|| 'cooked'||'served'
            })
            return order
        }
        catch(except){
            throw except;
        }
    }

    createOrder = async(order)=>{
        try{
            let ord = new OrderModel(order);
            return await ord.save();
        }
        catch(except){
            throw except;
        }
    }

    updateOrderStatus = async(orderId, status)=>{
        try{
            let update = await OrderModel.updateOne({_id: orderId}, {status: status});
            return update;
        }
        catch(except){
            next(except);
        }
    }

    getByFilter = async(filter)=>{
        try{
            const detail = await OrderModel.find(filter)
                .populate('foodId', ['_id', 'title', 'category', 'price', 'discount', 'afterDiscount'])
                .populate('customerId', ['_id', 'name'])

            return detail
        }
        catch(except){
            throw except
        }
    }

    getById = async(id)=>{
        try{
            const detail = await OrderModel.findById(id)
                .populate('foodId', ['_id', 'title', 'category', 'price', 'discount', 'afterDiscount'])
                .populate('customerId', ['_id', 'name'])

            return detail
        }
        catch(except){
            throw except
        }
    }

    removeSelectionById = async(id)=>{
        try{
            const old = await OrderModel.findByIdAndDelete(id)
            return old
        }
        catch(except){
            throw except
        }
    }

    
}

const orderSvc = new OrderService();

module.exports = orderSvc;