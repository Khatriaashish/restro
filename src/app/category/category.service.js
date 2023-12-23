const { generateRandomNumber } = require("../../config/helpers");
const CategoryModel = require("./category.model");

class CategoryService{
    create = async(data)=>{
        try{
            let category = await CategoryModel(data);
            return await category.save()
        }
        catch(except){
            throw except
        }
    }

    checkSlug = async(slug)=>{
        try{
            let count = await CategoryModel.countDocuments({slug: slug});
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
            let response = await CategoryModel.find(filter)
                .populate('createdBy', ['_id', 'name'])
                .populate('parentId', ['_id', 'title'])
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
            let response = await CategoryModel.findOne(filter)
                .populate('createdBy', ['_id', 'name'])

            if(response)
                return response
            else    
                throw {code: 400, message:"No such category exist anymore"}
        }
        catch(except){
            throw except
        }
    }

    count = async(filter = {})=>{
        try{
            let count = await CategoryModel.countDocuments(filter);
            return count;
        }
        catch(except){
            throw except
        }
    }

    update = async(id, data) =>{
        try{
            let update = await CategoryModel.findByIdAndUpdate(id, data);
            return update
        }
        catch(except){
            throw except
        }
    }

    delete = async(filter) =>{
        try{
            let deleted = await CategoryModel.findByIdAndDelete(filter);
            return deleted
        }
        catch(except){
            throw except
        }
    }

    getBySlug = async(filter)=>{
        try{
            const response = await CategoryModel.findOne(filter)
            .populate('createdBy', ['_id', 'name'])
            .populate('parentId', ['_id', 'title']);
            if(!response)
                throw {code: 404, message: "Category doesn't exist"}

            return response
        }
        catch(except){
            throw except;
        }
    }
}

const categorySvc = new CategoryService();
module.exports = categorySvc