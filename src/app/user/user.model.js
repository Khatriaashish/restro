const mongoose = require('mongoose');

const UserDefScehma = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'kitchen', 'customer', 'waiter'],
        default: 'customer'
    },
    image: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    password: {
        type: String,
        default: null
    },
    token: String,
    resetToken: String,
    resetExpiry: Date
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model("User", UserDefScehma);

module.exports = UserModel