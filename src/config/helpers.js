const fs = require('fs')

const generateRandomString = (len = 100) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for(let i = 1; i<=len; i++){
        let pos = Math.floor(Math.random()*chars.length);
        random += chars[pos];
    }
    return random;
}

const generateRandomNumber = (limit, lower = 0)=>{
    let posn = Math.ceil(lower + (Math.random()*limit));
    return posn
}

const deleteFile = (path, filename)=>{
    if(fs.existsSync(path+filename)){
        fs.unlinkSync(path+filename)
    }
}

module.exports = {generateRandomString, generateRandomNumber, deleteFile}