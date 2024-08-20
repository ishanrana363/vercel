const courseModel = require("../models/courseModel");
const {parseUserToken} = require("../helper/helper");
const checkAssociate = require("../services/checkAssociate");
const courseDetailsModel = require("../models/courseDetailsModel");
const mongoose = require("mongoose");


class courseClass  {
    courseCreate = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            const reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await courseModel.create(reqBody);
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
    courseUpdate = async (req,res)=>{
        const userToken = parseUserToken(req);
        try{
            let id = req.params.id;
            let filter = {_id : id};
            let reqBody = req.body;
            let update = reqBody;
            let data = await courseModel.findById(filter);
            if (!data){
                return res.status(404).json({
                    status : "fail",
                    msg : "Course data not found"
                })
            }
            if (userToken.role==="admin"){
                await courseModel.findByIdAndUpdate(filter,update);
                return res.status(200).json({
                    status : "success",
                    msg : "Course update successfully"
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : 'fail',
                msg : e.toString()
            });
        }
    };

    courseDelete = async (req, res) => {
        const userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = { _id: id };
            let data = await courseModel.findById(filter);

            // Handle case where course data is not found
            if (!data) {
                return res.status(404).json({
                    status: 'fail',
                    msg: "Course data not found"
                });
            }

            // Check if the user is an admin
            if (userToken.role === "admin") {
                let deleteId = new mongoose.Types.ObjectId(req.params.id);
                let checkDeleteData = await checkAssociate({ course_id: deleteId }, courseDetailsModel);

                // Handle case where course is associated with course details
                if (checkDeleteData) {
                    return res.status(400).json({
                        status: "fail",
                        msg: "Associate with course details"
                    });
                } else {
                    // Delete the course and send a success response
                    await courseModel.deleteOne(filter);
                    return res.status(200).json({
                        status: "success",
                        msg: "Course data deleted successfully"
                    });
                }
            } else {
                // Handle case where the user doesn't have permission
                return res.status(403).json({
                    status: "fail",
                    msg: "Permission not granted"
                });
            }
        } catch (e) {
            // Handle any unexpected errors
            return res.status(500).json({
                status: "fail",
                msg: e.toString()
            });
        }
    };

    getAllCourse = async (req,res)=>{
        try {
            let data = await courseModel.find();
            if (data.length===0){
                return res.status(404).json({
                    status : "fail",
                    msg : "Course not found"
                });
            }else {
                return res.status(200).json({
                    status : 'success',
                    data : data
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : 'fail',
                msg : e.toString()
            });
        }
    };
}


const courseController = new courseClass();

module.exports = courseController;