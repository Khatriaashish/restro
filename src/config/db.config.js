const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    dbname: process.env.MONGO_NAME,
    autoCreate: true,
    autoIndex: true
}).then((success)=>{
    console.log("Database Connection Succesful")
}).catch((err)=>{
    console.log("Database connection failed");
    process.exit(1);
})