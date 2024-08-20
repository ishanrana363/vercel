const {parseUserToken} = require("../helper/helper");

const isValidUser = (req,res,next)=>{
    try {
        const userData = parseUserToken(req);
        next();
    }catch (e) {
        res.status(401).json({
            status:"fail",
            msg : "Unauthorized user"
        });
        
    }
};

const isAdmin = (req,res,next)=>{
    try {
        const userData = parseUserToken(req);
        if (userData.role==="admin"){
            next();
        }else {
            res.status(403).json({
                status:"fail",
                msg : "Permission not granted"
            });
        }
    }catch (e) {
        return res.status(401).json({
            status : "fail",
            msg : "Unauthorized user"
        });
    }
};


const isSuperAdmin = (req,res,next)=>{
    try {
        const userData = parseUserToken(req);
        if (userData.role==="super-admin"){
            next();
        }else {
            res.status(403).json({
                status:"fail",
                msg : "Permission not granted"
            });
        }
    }catch (e) {
        return res.status(401).json({
            status : "fail",
            msg : "Unauthorized user"
        });
    }
}

module.exports = {
    isValidUser,
    isAdmin,
    isSuperAdmin
}