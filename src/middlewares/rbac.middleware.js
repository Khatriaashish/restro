const checkPermission = (role)=>{
    return (req, res, next)=>{
        try{
            let loggedInUser = req.authUser;
            if((typeof role === 'string' && loggedInUser.role === role) || (typeof role !== 'string' && role.includes(loggedInUser.role))){
                next();
            }
            else{
                next({code: 401, message: "You do not have permission to access this route"})
            }
        }
        catch(except){
            next(except)
        }
    }
}

module.exports = checkPermission