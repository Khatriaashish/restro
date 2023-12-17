const MailService = require('../../services/mail.service');
const dotenv = require('dotenv');
const AuthRequest = require('./auth.request');
const authSvc = require('./auth.service');
const bcrypt = require('bcryptjs')
dotenv.config()

class AuthController{
    register = async (req, res, next)=>{
        try{
            //getdata
            const payload = (new AuthRequest(req)).registerTransform();
            
            //datastore
            const response = await authSvc.payloadStore(payload);

            //mail
            const msg = `Dear ${payload.name}, <a href=${process.env.FE_URL}/${payload.token}>Click Here</a> to activate your account`
            await (new MailService()).sendEmail(payload.email, "Activate Your account", msg)
        
            //response
            res.json({
                result: response,
                message: "User data registered",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }

    verifyToken = async(req, res, next)=>{
        try{
            let token = req.params.token;
            let userDetail = await authSvc.getUserByFilter({token: token});
            if(userDetail){
                res.json({
                    result: userDetail,
                    message: "Token Verified",
                    meta: null
                })
            }
            else{
                next({code: 401, message: "User Doesn't exist"});
            }
        }   
        catch(except){
            next(except);
        }
    }

    setPassword = async(req, res, next)=>{
        try{
            let token = req.params.token;
            let userDetail = await authSvc.getUserByFilter({token: token});
            if(userDetail){
                if(token && password === null){
                    let encpassword = bcrypt.hashSync(req.body.password, 10);
                    let updateData = {
                        password: encpassword,
                        status: 'active',
                        token: null
                    }
                    let response = await authSvc.updateUser({token: token}, updateData);
                    res.json({
                        result: response,
                        message: "Password set successfully and user activated",
                        meta: null
                    })
                }
                else{
                    next({code: 400, message: "User alread verified"})
                }
            }
            else{
                next({code: 401, message: "User Doesn't exist"});
            }
        }   
        catch(except){
            next(except);
        }
    }

}

const authCtrl = new AuthController()
module.exports = authCtrl