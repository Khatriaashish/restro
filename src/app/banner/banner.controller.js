const { deleteFile } = require("../../config/helpers");
const BannerRequest = require("./banner.request");
const bannerSvc = require("./banner.service");

class BannerController{
    createBanner = async(req, res, next)=>{
        try{
            let data = (new BannerRequest(req)).createBannerTransform(req);

            let response = await bannerSvc.create(data);

            res.json({
                result: response,
                message: "Banner Created Successfully",
                meta: {
                    totalBanner: await bannerSvc.count()
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    listAllBanner = async(req, res, next)=>{
        try{
            let filter = {}

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
                    {createdBy: req.authUser._id},
                    {...filter}
                ]
            }

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10;
            let skip = (page-1)*limit;

            let banner = await bannerSvc.getByFilter(filter, {skip: skip, limit: limit});
            res.json({
                result: banner,
                message: "Banners fetched",
                meta: {
                    total: await bannerSvc.count(),
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
            const banner = req.content;
            res.json({
                result: banner,
                message: "Banner detail fetched",
                meta: null
            })
        }
        catch(except){
            next(except);
        }
    }

    editBanner = async(req, res, next)=>{
        try{
            let content = req.content
            if(content){
                
                let data = (new BannerRequest(req)).editBannerTransform(content.image);
                let update = await bannerSvc.update({_id: req.params.id}, data);
                if(content.image !== data.image){
                    deleteFile('./public/uploads/banner/', content.image)
                }
                res.json({
                    result: update,
                    message: "Banner Updated Successfully",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "Banner doesn't exist"});
            }

        }
        catch(except){
            next(except)
        }
    }

    deleteBanner = async(req, res, next)=>{
        try{
            let content = req.content;
            if(content){
                let deleted = await bannerSvc.delete(req.params.id)
                deleteFile('./public/uploads/banner/', content.image);
                res.json({
                    result: deleted,
                    message: "Banner deleted",
                    meta: {
                        remTotal: await bannerSvc.count()
                    }
                })
            }
            else{
                next({code: 400, message: "No such banner"});
            }
        }
        catch(except){
            next(except);
        }
    }

    getBannerForHome = async(req, res, next)=>{
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
            
            let banners = await bannerSvc.getByFilter(filter, {skip: skip, limit: limit}, {_id: 'desc'});
            res.json({
                result: banners,
                message: "All active banners fetched",
                meta: {
                    total: await bannerSvc.count()
                }
            })
        }
        catch(except){
            nect(except);
        }
    }
}

const bannerCtrl = new BannerController();

module.exports = bannerCtrl