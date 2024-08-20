
const curriculumModel = require("../models/curriculamModel");
class curriculumClass {

    getAllCurriculumService = async (req)=>{
        try {
            // join with course id
            let joinWithCourseId = {
                $lookup : {
                    from:"courses",
                    localField:"course_id",
                    foreignField:"_id",
                    as:"courseData"
                }
            };

            // unwind course id
            const unwindCourse = { "$unwind" : "$courseData" };
            // projection
            const projection = { $project : {
                // "_id" : 0,
                "record_video" : 1,
                    "live_class" : 1,
                    "quiz" : 1,
                    "title" : 1,
                    "description" : 1,
                    "courseData.course_name" : 1,
                    "courseData.batch_no" :1
            } };
            const data = await curriculumModel.aggregate([
                joinWithCourseId,
                unwindCourse,
                projection
            ]);

            return {
                status : "success",
                data : data
            };

        }catch (e) {
            return {
                status : "fail",
                msg : e.toString()
            };
        }
    };

}

const curriculumService = new curriculumClass();

module.exports = curriculumService;