const validateRequest = (schema)=>{
    return (req, res, next)=>{
        try{
            schema.parse(req.body);
            next()
        }
        catch(except){
            throw except;
        }
    }
}

module.exports = validateRequest