const learnerFeedbackModel = require("../models/larnarFeedbackModel");

class learnerFeedbackClass {
    learnerFeedbackDetails = async ()=>{
        try {
            // join course id

            const joinWithCourseId = {
                $lookup: {
                    from: "courses",             
                    localField: "course_id",     
                    foreignField: "_id",         
                    as: "courseDetails"          
                }
            };

            // unwind

            const unwind = { "$unwind" : "$courseDetails" };

            //projection
            let projection = {
                $project: {
                    "name" : 1,
                    "course_id": 1,                  // Include the "course_id" field
                    "feedback": 1,                   // Include the "feedback" field
                    "createdAt": 1,                  // Include the "createdAt" field
                    "courseDetails.course_name": 1,  // Include the "course_name" field within "courseDetails"
                    "_id": 1                         // Exclude the "_id" field if you don't want it (optional)
                }
            };
            
            

            let data = await learnerFeedbackModel.aggregate([
                joinWithCourseId,
                unwind,
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

const learnerFeedbackService = new learnerFeedbackClass();

module.exports = learnerFeedbackService;