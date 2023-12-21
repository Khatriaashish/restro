const { generateRandomString } = require("../../config/helpers");

class AuthRequest{
    body;
    file;
    constructor(req){
        this.body = req.body;
        this.file=req.file;
    }

    registerTransform = ()=>{
        let payload = {
            ...this.body
        }
        payload.image = this.file.filename;
        payload.status = 'inactive';
        payload.token = generateRandomString();

        return payload;
    }
}

module.exports = AuthRequest