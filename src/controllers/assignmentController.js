const assignmentModel = require("../models/assignmentModel");
const {parseUserToken} = require("../helper/helper");
const assignmentService = require("../services/assignmentService");

class assignmentClass {
    createAssignment = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin" ){
                let data = await assignmentModel.create(reqBody);
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
                status : "fail",
                msg : e.toString()
            });
        }
    };
    updateAssignment = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = {
                _id : id
            };
            let data = await assignmentModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin" ){
                let reqBody = req.body;
                await assignmentModel.findByIdAndUpdate(matchStage,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : 'Assignment update successfully'
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
    deleteAssignment = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = { _id: id };
            let data = await assignmentModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });

            if (userToken.role==="admin"){
                await assignmentModel.findByIdAndDelete(matchStage);
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
    singleAssignment = async (req,res)=>{
        let data = await assignmentService.singleAssignmentService(req);
        return res.send(data);
    };
    allAssignment = async (req,res)=>{
        let data = await assignmentService.allAssignmentService(req);
        res.send(data);
    };
}

const assignmentController = new assignmentClass();

module.exports = assignmentController;