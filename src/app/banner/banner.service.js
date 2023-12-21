const BannerModel = require("./banner.model");

class BannerService{
    create = async(data)=>{
        try{
            let banner = await BannerModel(data);
            return await banner.save()
        }
        catch(except){
            next(except)
        }
    }

    getByFilter = async(filter, page = {skip:0, limit:10}, sort = {_id: 'desc'})=>{
        try{
            let response = await BannerModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .sort(sort)
                .skip(page.skip)
                .limit(page.limit)
            return response
        }
        catch(except){
            throw except
        }
    }

    getById = async(filter)=>{
        try{
            let response = await BannerModel.findOne(filter)
                .populate('createdBy', ['_id', 'name'])

            if(response)
                return response
            else    
                throw {code: 400, message:"No such banner exist anymore"}
        }
        catch(except){
            throw except
        }
    }

    count = async(filter = {})=>{
        try{
            let count = await BannerModel.countDocuments(filter);
            return count;
        }
        catch(except){
            next(except)
        }
    }

    update = async(id, data) =>{
        try{
            let update = await BannerModel.findByIdAndUpdate(id, data);
            return update
        }
        catch(except){
            next(except)
        }
    }

    delete = async(filter) =>{
        try{
            let deleted = await BannerModel.findByIdAndDelete(filter);
            return deleted
        }
        catch(except){
            next(except)
        }
    }
}

const bannerSvc = new BannerService();
module.exports = bannerSvc