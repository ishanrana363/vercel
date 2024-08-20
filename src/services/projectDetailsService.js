const  projectModel = require("../models/projectModel");

class projectDetailsClass {
    projectDetails = async ()=>{
        try {
            // join course id
            let joinWithProjectId = {
                $lookup : {
                    from : "courses",
                    localField : "course_id",
                    foreignField :"_id",
                    as : "projectData"
                }
            };
            // unwind project data
            const unwind = { "$unwind" : "$projectData" };
            //projection
            const projection = {
                $project : {
                    "projectData._id": 0,
                    "projectData.course_img" : 0 ,
                    "projectData.instructor_img" : 0,
                    "projectData.total_sit" : 0,
                    "projectData.batch_no" : 0,
                    "projectData.createdAt" : 0,
                    "projectData.updatedAt" : 0,
                    "projectData.instructor_name" : 0,
                }
            };
            let data = await projectModel.aggregate([
                joinWithProjectId,
                unwind,
                projection
            ]);
            return {
                status : "success",
                data : data
            };
        }catch (e) {
            return {
                status:"fail",
                msg : e.toString()
            };
        }
    };

}

const projectDetailsService = new projectDetailsClass();

module.exports = projectDetailsService;