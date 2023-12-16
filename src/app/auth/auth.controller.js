const nodemailer = require('nodemailer')
const {generateRandomNumber} = require('../../config/helpers');
const MailService = require('../../services/mail.service');
const dotenv = require('dotenv');
dotenv.config()

class AuthController{
    register = async (req, res, next)=>{
        const payload = req.body;
    
        payload.image = req.file.filename;
        payload.token = generateRandomNumber();
        payload.status = 'inactive';
    
    
        //[:db save]

        //nodemailer
        const msg = `Dear ${payload.name}, <a href=${process.env.FE_URL}/${payload.token}>Click Here</a> to activate your account`
        await (new MailService()).sendEmail(payload.email, "Activate Your account", msg)
    
        res.json({
            result: payload,
            message: "User data registered",
            meta: null
        })
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl