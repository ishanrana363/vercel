const curriculumModel = require("../models/curriculamModel");
const {parseUserToken} = require("../helper/helper");
const curriculumService = require("../services/curriculamService")
const mongoose = require("mongoose");

class curriculumClass {
    createCurriculum = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await curriculumModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow "
                });
            }
        }catch (e){
            return res.status(500).json({
                status:"fail",
                msg : e.toString()
            });
        }
    };
    updateCurriculum = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let filter = { _id : id };
            let data = await curriculumModel.findById(filter);
            if (!data) return  res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });
            const update = req.body;
            if (userToken.role==="admin"){
                await curriculumModel.findByIdAndUpdate(filter,update);
                return res.status(200).json({
                    status :"success",
                    msg : "Update successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not granted"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    curriculumDelete = async (req,res)=>{
        let userToken = parseUserToken(req)
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let filter = { _id: id };
            let data = await curriculumModel.findById(id);
            if(!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin"){
                await curriculumModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status:"success",
                    msg : "delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    getAllCurriculum = async (req,res)=>{
        let data = await curriculumService.getAllCurriculumService(req);
        res.send(data);
    };

}

const curriculumController = new curriculumClass();

module.exports = curriculumController;