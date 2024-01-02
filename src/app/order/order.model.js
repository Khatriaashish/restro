const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    foodId: {
        type: mongoose.Types.ObjectId,
        ref: "Food",
        required: true
    },
    detail: {
        title: String,
        price: Number,
        image: String
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    rate: {
        type: Number,
        required: true,
        min: 1
    },
    VatAmt: {
        type: Number
    },
    discount: {
        type: Number,
        min: 0
    },
    serviceCharge: {
        type: Number
    }, 
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['new', 'cooking', 'cooked', 'served', 'paid'],
        default: 'new'
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel