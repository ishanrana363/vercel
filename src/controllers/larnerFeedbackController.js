const learnerFeedbackModel = require("../models/larnarFeedbackModel");
const {parseUserToken} = require("../helper/helper");
const learnerFeedbackService = require("../services/learnerFeedbackService");

class learnerFeedbackClass  {
    create = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await learnerFeedbackModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
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
    update = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await learnerFeedbackModel.findOne(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin"){
                let reqBody = req.body;
                await learnerFeedbackModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : "update successfully"
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
    deleteFeedback = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await learnerFeedbackModel.findOne(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "data not found"
            });
            if (userToken.role==="admin"){
                await learnerFeedbackModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : 'fail',
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
    allFeedback = async (req,res)=>{
        let data = await learnerFeedbackService.learnerFeedbackDetails();
        res.send(data);
    }
}

const learnerFeedbackController = new learnerFeedbackClass();

module.exports = learnerFeedbackController;