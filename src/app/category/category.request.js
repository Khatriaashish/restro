const { default: slugify } = require("slugify");

class CategoryRequest{
    body;
    file;
    user;
    constructor(req){
        this.body = req.body;
        this.file = req.file;
        this.user = req.authUser;
    }

    createCategoryTransform = ()=>{
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
            data.slug = slugify(this.body.title, {
                replacement: '-',
                lower:true
            })
            if(!this.body.parentId || this.body.parentId === 'null' || this.body.parentId === '')
                data.parentId = null;

            return data;
        }
        catch(except){
            throw except;
        }
    }

    editCategoryTransform = (image)=>{
        try{
            let data = {
                ...this.body
            }
            if(this.file)
                data.image = this.file.filename;
            else{
                data.image = image
            }

            if(!this.body.parentId || this.body.parentId === 'null' || this.body.parentId === '')
                data.parentId = null;

            return data;
        }
        catch(except){
            throw except;
        }
    }
}

module.exports = CategoryRequest