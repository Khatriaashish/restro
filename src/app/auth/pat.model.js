const mongoose = require('mongoose');

const patDefSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    token: {
        type: String,
        reuire: true
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const PatModel = mongoose.model("PAT", patDefSchema);

module.exports = PatModel