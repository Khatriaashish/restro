const { deleteFile } = require("../../config/helpers");
const FoodRequest = require("./food.request");
const foodSvc = require("./food.service");
const FoodModel = require('../food/food.model')
class FoodController{
    createFood = async(req, res, next)=>{
        try{
            let data = (new FoodRequest(req)).createFoodTransform(req);
            data.slug = await foodSvc.checkSlug(data.slug)

            let response = await foodSvc.create(data);

            res.json({
                result: response,
                message: "Food Created Successfully",
                meta: {
                    totalFood: await foodSvc.count()
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    listAllFood = async(req, res, next)=>{
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

            let page = +req.query['page'] || 1;
            let limit = +req.query['limit'] || 10;
            let skip = (page-1)*limit;

            let food = await foodSvc.getByFilter(filter, {skip: skip, limit: limit});
            res.json({
                result: food,
                message: "Foods fetched",
                meta: {
                    total: await foodSvc.count(),
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
            const food = req.content;
            res.json({
                result: food,
                message: "Food detail fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    editFood = async(req, res, next)=>{
        try{
            let content = req.content
            if(content){
                
                let data = (new FoodRequest(req)).editFoodTransform(content);
                let update = await foodSvc.update(req.params.id, data);
                req.delImages.map((img)=>{
                    deleteFile('./public/uploads/food/', img.filename);
                })
                res.json({
                    result: update,
                    message: "Food Updated Successfully",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "Food doesn't exist"});
            }

        }
        catch(except){
            next(except)
        }
    }

    deleteFood = async(req, res, next)=>{
        try{
            let content = req.content;
            if(content){
                let deleted = await foodSvc.delete(req.params.id)
                req.delImages.map((img)=>{
                    deleteFile('./public/uploads/food/', img.filename);
                })
                res.json({
                    result: deleted,
                    message: "Food deleted",
                    meta: {
                        remTotal: await foodSvc.count()
                    }
                })
            }
            else{
                next({code: 400, message: "No such food"});
            }
        }
        catch(except){
            next(except);
        }
    }

    getFoodForHome = async(req, res, next)=>{
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

            let page = +req.query['page'] || 1;
            let limit = +req.query['limit'] || 10;
            let skip = (page-1)*limit;
            
            let foods = await foodSvc.getByFilter(filter, {skip: skip, limit: limit}, {_id: 'desc'});
            res.json({
                result: foods,
                message: "All active foods fetched",
                meta: {
                    total: await foodSvc.count()
                }
            })
        }
        catch(except){
            next(except);
        }
    }

    getDetailBySlug = async(req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    $or: [
                        {title: new RegExp(req.query['search'], 'i')},
                        {description: new RegExp(req.query['search'], 'i')},
                        {tag: new RegExp(req.query['search'], 'i')},
                    ]
                    
                }
            }

            filter = {
                $and: [
                    {slug: req.params.slug, status: 'active'},
                    {...filter}
                ]
            }

            let page = +req.query['page'] || 1;
            let limit = +req.query['limit'] || 10;
            let skip = (page-1)*limit;
            let sort = {rating: 'desc', _id: "desc"}
            if(req.query.sort){
                let sortsplit = req.query.sort.split(',');
                sort = {[sortsplit[0]]: sortsplit[1]}
            }
            let detail = await foodSvc.getBySlug(filter, {skip, limit}, sort);

            //food 
            res.json({
                result: detail,
                message: "Food detail from slug fetched",
                meta: {
                    total: await foodSvc.count(),
                    page: page,
                    limit: limit
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    createReview = async(req, res, next)=>{
        try{
            const id = req.params.id;
            const review = req.body;
            const content = req.content;

            const alreadyReviewed = content.reviews.map((review)=>review.user.toString() === req.authUser._id.toString()).pop();
            if(alreadyReviewed){
                next({code: 400, message: "Product already reviewed"});
            }

            const reviews = {
                user: req.authUser._id,
                rating: review.rating,
                comment: review.comment
            }

            await FoodModel.updateOne({_id: id}, {$push: {reviews: reviews}});

            const food = await FoodModel.findById(id);
            let numReviews = food.reviews.length; 
            let rating = food.reviews.reduce((acc, item)=>item.rating+acc, 0)/numReviews;
            const updateData = {
                numReviews: numReviews,
                rating: rating
            }

            let response = await ProductModel.updateOne({_id: id}, updataData);
            res.json({
                result: response,
                message: "Reviewed",
                meta: null
            })
        }
        catch(except){
            next(except)
        }
    }

}

const foodCtrl = new FoodController();

module.exports = foodCtrl