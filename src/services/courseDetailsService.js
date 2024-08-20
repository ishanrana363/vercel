const courseDetailsModel = require("../models/courseDetailsModel");
const mongoose = require("mongoose");


class courseDetailsServiceClass {
    getAllCourseDetails = async (req)=>{
        try {

            // join with course id

            const joinWithCourseId = {
                $lookup : {
                    from : "courses",
                    localField:"course_id",
                    foreignField:"_id",
                    as:"courseData"
                }
            };

            // join with curriculum model

            const joinWithCurriculumId = {
                $lookup: {
                    from: "curriculums",
                    localField: "curriculum_id",
                    foreignField: "_id",
                    as: "curriculum"
                }
            };

            // join with get course id

            const joinWithGetCourseId = {
                $lookup: {
                    from: "getcoursedatas",
                        localField: "get_course_id",
                        foreignField: "_id",
                        as: "joinedResult"
                }
            }

            const data = await courseDetailsModel.aggregate([
                joinWithCourseId,
                joinWithCurriculumId,
                joinWithGetCourseId
            ]);

            return {
                status:"success",
                data : data
            };



        }catch (e) {
            return {
                status : 'fail',
                msg : e.toString()
            };
        }
    };

}

const courseDetailsService = new courseDetailsServiceClass();

module.exports = courseDetailsService;