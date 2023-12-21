const express = require('express');
const app = express();
const router = require('../routes/');
const { MulterError } = require('multer');
const { ZodError } = require('zod');
require('./db.config')

//bodyparse
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//api
app.use('/api/v1', router)

//404 handling
app.use((req, res, next)=>{
    res.status(404).json({
        result: null,
        message: 'Page not found',
        meta: null
    })
})

//exception handling
app.use((err, req, res, next)=>{
    let code = err.code??500;
    let message = err.message??"Internal Server Error";
    let result = err.result??null;

    //multer exception
    if(err instanceof MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            code = 400;
            message = "File too large"
        }
    }

    //zod exception
    if(err instanceof ZodError){
        code = 400;
        let msg = {}

        err.errors.map((err)=>{
            msg[err.path[0]] = err.message;
        })
        message = "Validation Failure";
        result = msg;
    }   

    //mongodb exception
    if(err.code === 11000){
        code = 400;
        let uniqueKeys = Object.keys(error.keyPattern)
        let msgbody = uniqueKeys.map((key)=>{
            return{
                [key]: key + ' should be unique'
            }
        })
        result = msgbody;
        message: "Database validation failed"
    }

    //response
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})


module.exports = app;