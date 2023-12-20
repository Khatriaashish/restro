const authSvc = require('../app/auth/auth.service')
const jwt = require('jsonwebtoken')
const checkLogin = async(req, res, next)=>{
    try{
        let token = null;

        if(req.headers['x-xsrf-token']){
            token = req.headers['x-xsrf-token'];
        }

        if(req.params['token']){
            token = req.params['token'];
        }

        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }
        if(token === null){
            next({code: 401, message: "Login Required"})
        }
        else{
            token = token.split(" ").pop();
            if(!token){
                next({code: 400, message: "Token Required"})
            }
            else{
                let PAT = await authSvc.getPATByFilter({token: token});
                if(PAT){
                    let data = jwt.verify(token, process.env.JWT_SECRET)
                    let userDetail = await authSvc.getUserByFilter({_id: PAT.userId});
                    if(userDetail){
                        req.authUser = userDetail;
                        next()
                    }
                    else{
                        next({code: 401, message: "User doesn't exist anymore"})
                    }
                }
                else{
                    next({code: 401, message: "Token Expired"})
                }
            }
        }

    }
    catch(except){
        next({code: 401, message: except.message})
    }
}

module.exports = checkLogin