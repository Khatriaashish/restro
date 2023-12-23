const { generateRandomNumber } = require("../../config/helpers");
const FoodModel = require("./food.model");

class FoodService{
    create = async(data)=>{
        try{
            let food = await FoodModel(data);
            return await food.save()
        }
        catch(except){
            throw except
        }
    }

    checkSlug = async(slug)=>{
        try{
            let count = await FoodModel.countDocuments({slug: slug});
            if(count>0){
                let random = generateRandomNumber(1000);
                slug = slug + '-' + random;

                return await this.checkSlug(slug)
            }
            else{
                return slug
            }
        }
        catch(except){
            throw except
        }
    }

    getByFilter = async(filter, page = {skip:0, limit:10}, sort = {_id: 'desc'})=>{
        try{
            let response = await FoodModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .populate('category', ['_id', 'title'])
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
            let response = await FoodModel.findOne(filter)
                .populate('createdBy', ['_id', 'name'])

            if(response)
                return response
            else    
                throw {code: 400, message:"No such food exist anymore"}
        }
        catch(except){
            throw except
        }
    }

    count = async(filter = {})=>{
        try{
            let count = await FoodModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except
        }
    }

    update = async(id, data) =>{
        try{
            let update = await FoodModel.findByIdAndUpdate(id, data);
            return update
        }
        catch(except){
            throw except
        }
    }

    delete = async(filter) =>{
        try{
            let deleted = await FoodModel.findByIdAndDelete(filter);
            return deleted
        }
        catch(except){
            throw except
        }
    }

    getBySlug = async(filter)=>{
        try{
            const response = await FoodModel.findOne(filter)
            .populate('createdBy', ['_id', 'name'])
            .populate('category', ['_id', 'title']);
            if(!response)
                throw {code: 404, message: "Food doesn't exist"}

            return response
        }
        catch(except){
            throw except;
        }
    }
}

const foodSvc = new FoodService();
module.exports = foodSvc