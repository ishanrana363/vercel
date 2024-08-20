const projectModel = require("../models/projectModel");
const {parseUserToken} = require("../helper/helper");
const projectDetailsService = require("../services/projectDetailsService");

class projectClass {
    projectCreate = async (req,res)=>{
        let userToken = parseUserToken(req);
        try{
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await projectModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : 'fail',
                    msg : "Permission not allow "
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    projectUpdate = async(req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await projectModel.findOne(filter);
            if(!data){
                return res.status(404).json({
                    status : "fail",
                    msg :"Data not found "
                });
            }
            if(userToken.role==="admin"){
                let reqBody = req.body;
                await projectModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status : 'success',
                    msg : "Update successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not granted"
                });
            }
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg :  e.toString()
            });
        }
    };
    projectDelete = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await projectModel.findOne(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });
            if (userToken.role==="admin"){
                await projectModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "Delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    projectDetails = async (req,res)=>{
        let data = await projectDetailsService.projectDetails();
        return res.send(data);
    };
}
const projectController = new projectClass();

module.exports = projectController;