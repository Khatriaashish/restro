const { default: slugify } = require("slugify");
const { deleteFile } = require("../../config/helpers");

class FoodRequest {
    body;
    files;
    user;
    constructor(req) {
        this.body = req.body;
        this.files = req.files;
        this.user = req.authUser;
    }

    createFoodTransform = () => {
        try {
            let data = {
                ...this.body
            }
            if (this.files)
                data.images = this.files.map((img) => img.filename);
            else {
                data.images = null
            }
            data.createdBy = this.user._id;
            data.slug = slugify(this.body.title, {
                replacement: '-',
                lower: true
            })
            if (!data.category || data.category === 'null' || data.category === '')
                data.category = null;


            data.afterDiscount = data.price - data.price * data.discount / 100;

            data.tags = data.tags.split(',')

            return data;
        }
        catch (except) {
            throw except;
        }
    }

    editFoodTransform = (food) => {
        try {
            let data = {
                ...this.body
            }
            if (this.files)
                data.images = this.files.map((img) => img.filename);

            data.images = [...data.images, ...food.images];

            if (data.delImages) {
                let images = data.images.filter((img) => !data.delImages.includes(img));
                data.images = images;
            }

            if (!data.category || data.category === 'null' || data.category === '')
                data.category = null;

            data.afterDiscount = data.price - data.price * data.discount / 100;

            data.tags = data.tags.split(',')
            return data;
        }
        catch (except) {
            throw except;
        }
    }
}

module.exports = FoodRequest