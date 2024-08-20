const instructorModel = require("../models/instructorModel");
const {parseUserToken} = require("../helper/helper");
const instructorService = require("../services/instructorService")
class instructorClass  {
    instructorCreate = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await instructorModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
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
                status:"fail",
                msg : e.toString()
            });
        }
    };
    instructorUpdate = async (req,res)=>{
        try {
            const userToken = parseUserToken(req);
            let id = req.params.id;
            const filter = { _id : id };
            const reqBody = req.body;
            let instructorData = await instructorModel.findById(filter);
            if (!instructorData){
                return res.status(404).json({
                    status:"fail",
                    msg : "Instructor data not found"
                });
            }else if (userToken.role==="admin"){
                await instructorModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status:"success",
                    msg : "update successfully "
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
    instructorDelete = async (req,res)=>{
        try {
            let userToken = parseUserToken(req);
            let id = req.params.id;
            let filter = {_id : id};
            const instructorData = await instructorModel.findOne(filter);
            if (!instructorData){
                return res.status(404).json({
                    status:"fail",
                    msg : "Instructor data not found"
                });
            }else if(userToken.role==="admin"){
                await instructorModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status:"success",
                    msg : "Instructor data delete successfully"
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
    allInstructor = async (req,res)=>{
        let data = await instructorService.instructorDetails();
        res.send(data);
    };
}

const instructorController = new instructorClass();
module.exports = instructorController;