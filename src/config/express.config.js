const express = require('express');
const app = express();
const router = require('../routes/')

//bodyparse
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//api
app.use('/api/v1', router)

module.exports = app;