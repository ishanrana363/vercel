const moduleModel = require("../models/moduleModel");

class moduleServiceClass {
    getAllModule = async ()=>{
        try {
            // join course_id
            let joinWithCourseId = {
                $lookup : {
                    from : "courses",
                    localField : "courses",
                    foreignField : "course_id",
                    as : "data"
                }
            };
            // unwind
            let unwind = { "$unwind" : "$data" };

            // projection
            let projection = {
                $project : {
                    "course_id" : 0,
                    "user_id" : 0,
                    "data.course_img" : 0,
                    "data.instructor_name" : 0,
                    "data.instructor_img" : 0,
                    "data.total_sit" : 0,
                    "data.batch_no" : 0,
                    "data.createdAt" : 0,
                    "data.updatedAt" : 0,
                }
            }

            let data = await moduleModel.aggregate([
                joinWithCourseId,
                unwind,
                projection
            ]);
            return {
                status : "success",
                data : data
            }
        }catch (e) {
            return {
                status : "fail",
                msg : e.toString()
            };
        }
    };
}

const moduleService = new moduleServiceClass();
module.exports = moduleService;