class BannerRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser;
    }

    createBannerTransform = ()=>{
        try{
            let data = {
                ...this.body
            }
            if(this.file)
                data.image = this.file.filename;
            else{
                throw {code: 400, message: "Image Required"}
            }
            data.createdBy = this.user._id;

            return data;
        }
        catch(except){
            throw except;
        }
    }

    editBannerTransform = (image)=>{
        try{
            let data = {
                ...this.body
            }
            if(this.file)
                data.image = this.file.filename;
            else{
                data.image = image
            }

            return data;
        }
        catch(except){
            throw except;
        }
    }
}

module.exports = BannerRequest