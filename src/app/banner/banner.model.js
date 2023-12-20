const mongoose = require('mongoose');

const bannerDefSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2
    },
    url: {
        type: String
    },
    image: String,
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

const BannerModel = mongoose.model('Banner', bannerDefSchema);

module.exports = BannerModel