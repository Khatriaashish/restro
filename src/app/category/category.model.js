const mongoose = require('mongoose');

const categoryDefSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        nullable: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const CategoryModel = mongoose.model('Category', categoryDefSchema);

module.exports = CategoryModel