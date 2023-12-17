const UserModel = require("../user/user.model")

class AuthService{
    payloadStore = async(payload)=>{
        try{
            let user = new UserModel(payload);
            return await user.save()
        }catch(except){
            throw except;
        }
    }

    getUserByFilter = async(filter)=>{
        try{
            let response = await UserModel.findOne(filter);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    updateUser = async(filter, updateData)=>{
        try{
            let response = await UserModel.updateOne(filter, updateData);
            return response;
        }
        catch(except){
            throw except;
        }
    }
}

const authSvc = new AuthService()
module.exports = authSvc