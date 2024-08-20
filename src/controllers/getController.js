const {parseUserToken} = require("../helper/helper");
const mongoose = require("mongoose");
const getCourseService = require("../services/getCourseService");
const  getCourseModel = require("../models/getModel");
const checkAssociate = require("../services/checkAssociate");
const courseDetailsModel = require("../models/courseDetailsModel");

class getCourseClass {
    create= async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await getCourseModel.create(reqBody);
                return res.status(201).json({
                    status :"success",
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
            let update = {
                logo : req.body.logo,
                title : req.body.title,
                description : req.body.description
            };
            let id = new mongoose.Types.ObjectId(req.params.id);
            let matchStage = { _id : id };
            let data = await getCourseModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });
            if (userToken.role==="admin"){
                await getCourseModel.findByIdAndUpdate(matchStage,update);
                return res.status(200).json({
                    status : "success",
                    msg : "Update successfully"
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

    getAll = async (req,res)=>{
        let data = await getCourseService.getAllCourseData(req);
        res.send(data);
    };

    deleteData = async (req,res)=>{
        const userToken = parseUserToken(req);
        try{
            let id = new mongoose.Types.ObjectId(req.params.id);
            let filter = { _id: id };
            let data = await getCourseModel.findById(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });

            if (userToken.role==="admin"){
                await getCourseModel.findByIdAndDelete(filter);
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
                status:"fail",
                msg : e.toString()
            });
        }
    };
}

const getController = new getCourseClass();


module.exports = getController;