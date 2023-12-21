const { deleteFile } = require("../../config/helpers");
const CategoryRequest = require("./category.request");
const categorySvc = require("./category.service");

class CategoryController{
    createCategory = async(req, res, next)=>{
        try{
            console.log("here");
            let data = (new CategoryRequest(req)).createCategoryTransform(req);
            data.slug = await categorySvc.checkSlug(data.slug)

            let response = await categorySvc.create(data);

            res.json({
                result: response,
                message: "Category Created Successfully",
                meta: {
                    totalCategory: await categorySvc.count()
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    listAllCategory = async(req, res, next)=>{
        try{
            let filter = {}

            if(req.query['search']){
                filter = {
                    $or: [
                        {title: new RegExp(req.query['search'], 'i')}
                    ] 
                }
            }

            filter = {
                $and: [
                    {createdBy: req.authUser._id},
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10;
            let skip = (page-1)*limit;

            let category = await categorySvc.getByFilter(filter, {skip: skip, limit: limit});
            res.json({
                result: category,
                message: "Categorys fetched",
                meta: {
                    total: await categorySvc.count(),
                    page: page,
                    limit: limit
                }
            })
        }
        catch(except){
            next(except)
        }
    }
    
    getDetail = async(req, res, next)=>{
        try{
            const category = req.content;
            res.json({
                result: category,
                message: "Category detail fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    editCategory = async(req, res, next)=>{
        try{
            let content = req.content
            if(content){
                
                let data = (new CategoryRequest(req)).editCategoryTransform(content.image);
                let update = await categorySvc.update(req.params.id, data);
                if(content.image !== data.image){
                    deleteFile('./public/uploads/category/', content.image)
                }
                res.json({
                    result: update,
                    message: "Category Updated Successfully",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "Category doesn't exist"});
            }

        }
        catch(except){
            next(except)
        }
    }

    deleteCategory = async(req, res, next)=>{
        try{
            let content = req.content;
            if(content){
                let deleted = await categorySvc.delete(req.params.id)
                deleteFile('./public/uploads/category/', content.image);
                res.json({
                    result: deleted,
                    message: "Category deleted",
                    meta: {
                        remTotal: await categorySvc.count()
                    }
                })
            }
            else{
                next({code: 400, message: "No such category"});
            }
        }
        catch(except){
            next(except);
        }
    }

    getCategoryForHome = async(req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    $or: [
                        {title: new RegExp(req.query['search'], 'i')},
                        {url: new RegExp(req.query['search'], 'i')}
                    ]
                    
                }
            }

            filter = {
                $and: [
                    {status: 'active'},
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10;
            let skip = (page-1)*limit;
            
            let categorys = await categorySvc.getByFilter(filter, {skip: skip, limit: limit}, {_id: 'desc'});
            res.json({
                result: categorys,
                message: "All active categorys fetched",
                meta: {
                    total: await categorySvc.count()
                }
            })
        }
        catch(except){
            nect(except);
        }
    }

    getDetailBySlug = async(req, res, next)=>{
        try{
            let detail = await categorySvc.getBySlug({slug: req.params.slug, status: 'active'});

            //food 
            res.json({
                result: {
                    detail: detail,
                    food: null
                },
                message: "Category detail from slug fetched",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }
}

const categoryCtrl = new CategoryController();

module.exports = categoryCtrl