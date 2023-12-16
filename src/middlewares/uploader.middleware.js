const multer = require('multer');
const fs = require('fs');

const myStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let path = req.uploadDir??'./public/uploads/others';
        if(!fs.existsSync(path))
            fs.mkdirSync(path, {recursive: true});
        cb(null, path);
    },
    filename: (req, file, cb)=>{
        const random = Math.ceil(Math.random()*9999);
        const ext = file.originalname.split('.').pop().toLowerCase();
        let filename = Date.now() + "-" + random + '.' + ext;

        cb(null, filename)
    }
})

const imageFilter = (req, file, cb)=>{
    const allowed = ['jpg', 'png', 'jpeg', 'svg', 'bmp', 'webp', 'gif'];
    const ext = file.originalname.split('.').pop().toLowerCase();
    if(allowed.includes(ext))
        cb(null, true)
    else    
        cb({code: 415, message: "File format not supported"}, null)
}

const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 3000000
    }
})


module.exports = uploader