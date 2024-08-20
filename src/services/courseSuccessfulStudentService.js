const courseSuccessfulModel = require("../models/successfullStudentModel");

class courseSuccessfulStudentClass {
    courseSuccessfulStudentService = async(req,res)=>{
        try {
            // join course id
            const joinCourseId = {
                $lookup : {
                    from : "courses",
                    localField:"course_id",
                    foreignField:"_id",
                    as:"data"
                }
            };
            // unwind
            const unwind = {"$unwind":"$data"}

            // projection

            let projection = {
                $project : {
                    "course_id" : 1,
                    "student_name" : 1,
                    "batch_no" : 1,
                    "position_of_job" :1,
                    "createdAt" : 1,
                    "data.course_name" : 1
                }
            };

            const data = await courseSuccessfulModel.aggregate([
                joinCourseId,
                unwind,
                projection
            ]);
            return {
                status : "success",
                data : data
            };            
        } catch (e) {
            return {
                status:"fail",
                msg : e.toString()
            };
        }
    };
}

const courseSuccessfulService = new courseSuccessfulStudentClass();

module.exports = courseSuccessfulService
