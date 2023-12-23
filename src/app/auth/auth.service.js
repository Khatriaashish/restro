const UserModel = require("../user/user.model");
const PatModel = require("./pat.model");

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

    patStore = async(data)=>{
        try{
            let pat = new PatModel(data);
            let response = await pat.save();
            return response;
        }
        catch(except){
            throw except
        }
    }

    getPATByFilter = async(filter)=>{
        try{
            let response = await PatModel.findOne(filter);
            return response;
        }
        catch(except){
            throw except;
        }
    }

    deletePAT = async(userId)=>{
        try{
            let response = await PatModel.deleteOne({userId: userId});
            if(!response)
                next({code: 400, message: "Already Logged out"})
            return response
        }
        catch(except){
            throw except;
        }
    }
}

const authSvc = new AuthService()
module.exports = authSvc