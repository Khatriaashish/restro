const MailService = require('../../services/mail.service');
const dotenv = require('dotenv');
const AuthRequest = require('./auth.request');
const authSvc = require('./auth.service');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

    login = async(req, res, next)=>{
        try{
            let credentials = req.body;
            let userDetail = await authSvc.getUserByFilter({email: credentials.email});
            if(userDetail){
                if(userDetail.token === null && userDetail.status === 'active'){
                    if(bcrypt.compareSync(credentials.password, userDetail.password)){
                        let token = jwt.sign({
                            userId: userDetail._id
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1h'
                        })

                        let refreshToken = jwt.sign({
                            userId: userDetail._id
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1d'
                        })

                        let patdata = {
                            userId: userDetail._id,
                            token: token,
                            refreshToken: refreshToken
                        }

                        let response = await authSvc.patStore(patdata);

                        res.json({
                            result: {
                                token: token,
                                type: "Bearer"
                            },
                            message: "User logged in successfully"
                        })
                    }
                    else{
                        next({code: 401, message: "Credentials doesn't match"})
                    }
                }
                else{
                    next({code: 401, message: "Activate your account first"})
                }
            }
            else{
                next({code: 401, message: "User doesn't exist"})
            }
        }
        catch(except){
            next(except)
        }
    }

    logout = async(req, res, next)=>{
        try{
            let userId = req.authUser._id;
            let logout = await authSvc.deletePAT(userId);

            res.json({
                result: logout,
                message: "Logged Out Successfully",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }
}

const authCtrl = new AuthController()
module.exports = authCtrl