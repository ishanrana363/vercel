const courseSuccessfulModel = require("../models/successfullStudentModel");
const {parseUserToken} = require("../helper/helper");
const courseSuccessfulStudentService = require("../services/courseSuccessfulStudentService");

class courseSuccessfulClass {
    create = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if(userToken.role==="admin"){
                let data = await courseSuccessfulModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status :"fail",
                msg : e.toString()
            });
        }
    };
    update = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            const filter = {_id : id};
            let reqBody = req.body;
            let data = await courseSuccessfulModel.findOne(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin"){
                await courseSuccessfulModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : "update successfully"
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
    deleteStudent = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await courseSuccessfulModel.findById(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin"){
                await courseSuccessfulModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "delete successful"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status({
                status :"fail",
                msg : e.toString()
            });
        }
    };
    allStudent = async (req,res)=>{
        let data = await courseSuccessfulStudentService.courseSuccessfulStudentService();
        res.send(data);
    }
}
const courseSuccessfulStudentController = new courseSuccessfulClass();

module.exports = courseSuccessfulStudentController;