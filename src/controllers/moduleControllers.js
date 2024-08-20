const moduleModel = require("../models/moduleModel");
const {parseUserToken} = require("../helper/helper");
const checkAssociate = require("../services/checkAssociate");
const moduleDetails = require("../models/moduleDetailsModel");
const moduleService = require("../services/moduleService");
const mongoose = require("mongoose");
class moduleClass {
    moduleCreate = async (req,res)=>{
        let userToken = parseUserToken(req)
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await moduleModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : e.toString()
            });
        }
    };
    moduleUpdate = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await moduleModel.findById(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });
            let reqBody = req.body;
            if (userToken.role==="admin"){
                await moduleModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status:"success",
                    msg : "Module update successfully"
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : e.toString()
            });
        }
    };
    moduleDelete = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let deleteId = new mongoose.Types.ObjectId(req.params.id);
            const check = await checkAssociate(
                {_id: deleteId}, moduleDetails );
            if (userToken.role==="admin"){
                if (check){
                    return res.status(400).json({
                        status : "fail",
                        msg : "Associate with module details id"
                    });
                }else {
                    await moduleModel.findByIdAndDelete(deleteId);
                    return res.status(200).json({
                        status : "success",
                        msg : "Delete successfully"
                    });
                }
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                })
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    allModule = async (req,res)=>{
        let userToken = parseUserToken(req);
        if (userToken.role==="admin"){
            let data = await moduleService.getAllModule();
            res.send(data)
        }else {
            return res.status(403).json({
                status : "fail",
                msg : "Permission not allow"
            });
        }
    };
}


const moduleController = new moduleClass();

module.exports = moduleController;
