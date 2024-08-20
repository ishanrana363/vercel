const {parseUserToken} = require("../helper/helper");

const deleteService = async (req,dataModel)=>{
    let userToken = parseUserToken(req);
    try {
        let id = req.params.id;
        let query = {
            _id : id
        };
        if (userToken.role==="superAdmin"){
            const data = await dataModel.deleteMany(query);
            return { status:"success",data:data };
        }

    }catch (e) {
        return {status:"fail", msg : e.toString() }
    }
};

module.exports = deleteService;