const instructorModel = require("../models/instructorModel");

class instructorClass {

    instructorDetails = async ()=>{
        try {
            let joinWithCourseId = {
                $lookup : {
                    from:"courses",
                    localField:"course_id",
                    foreignField : "_id",
                    as:"course"
                }
            };

            // unwind
            const unwind = { "$unwind" : "$course" }

            // projection

            const projection = {
                $project : {
                    "_id": 1,
                    "instructor_name": 1,
                    "instructor_img": 1,
                    "instructor_role": 1,
                    "course.course_name": 1,
                }
            };

            const data = await instructorModel.aggregate([
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

const instructorService = new instructorClass();
module.exports = instructorService;