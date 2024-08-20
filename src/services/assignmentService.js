const assignmentModel = require("../models/assignmentModel");
const mongoose = require("mongoose");
const {parseUserToken} = require("../helper/helper");

class assignmentClass {
    singleAssignmentService = async (req)=>{
        const userToken = parseUserToken(req)
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let matchStage = { $match : { _id : id } };

            // join course id

            let joinWithCourseId = {
                $lookup : {
                    from : "courses",
                    localField : "course_id",
                    foreignField : "_id",
                    as : "courseData"
                }
            };

            // join module id

            let joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "moduleData"
                }
            };

            // unwind courseData

            const courseDataUnwind = { "$unwind" : "courseData" };

            // unwind moduleData

            const moduleDataUnwind = { "$unwind" : "$moduleData" };

            if (userToken.role==="admin"){
                const data = await assignmentModel.aggregate([
                    matchStage,
                    joinWithCourseId,
                    joinWithModuleId,
                    moduleDataUnwind,
                    courseDataUnwind
                ]);
                return {
                    status :  "success",
                    data : data
                };
            }else {
                return {
                    status : "fail",
                    msg :  "permission not allow"
                };
            }
        }catch (e) {
            return {
                status : "fail",
                msg : e.toString()
            };
        }
    };

    allAssignmentService = async (req) => {
        const userToken = parseUserToken(req);
        try {
            let joinWithCourseId = {
                $lookup: {
                    from: "courses",
                    localField: "course_id",
                    foreignField: "_id",
                    as: "course_details"
                }
            };

            let joinWithModuleId = {
                $lookup: {
                    from: "modules",
                    localField: "module_id",
                    foreignField: "_id",
                    as: "module-details"
                }
            };
            const unwindCourseDetails = { $unwind : "$course_details" };
            const unwindModuleDetails = { $unwind : "$module-details" };

            const projectionStage = {
                $project : {
                    "assignment_name" : 1,
                    "course_details.course_name" : 1,
                    "instructor_name" : 1,
                    "module-details.module_name" : 1,
                    "module-details.module_topic" : 1
                }
            };
            if (userToken.role==="admin"){
                let data = await assignmentModel.aggregate([
                    joinWithCourseId,
                    joinWithModuleId,
                    unwindCourseDetails,
                    unwindModuleDetails,
                    projectionStage
                ]);
                return {
                    status : "success",
                    data : data
                };
            }else {
                return {
                    status: "fail",
                    msg: "Permission not allow"
                };
            }
        }catch (e) {
            return{
                status : "fail",
                msg : e.toString()
            };
        }
    };


}

const assignmentService = new assignmentClass();

module.exports = assignmentService;