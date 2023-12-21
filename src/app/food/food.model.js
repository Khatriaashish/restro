const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            default: null
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    })

const foodDefSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2
    },
    slug: {
        type: String,
        unique: true
    },
    descrition: String,
    image: [{
        type: String,
        required: true
    }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    price: {
        type: Number,
        min: 1, 
        required: true
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    afterDiscount: {
        type: Number,
        min: 1
    },
    tags: [String],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    rating: {
        type: Number,
        default:0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const FoodModel = mongoose.model('Food', foodDefSchema);

module.exports = FoodModel