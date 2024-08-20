const {parseUserToken} = require("../helper/helper");
const getCourseModel = require("../models/getModel")

class getCourseClass {
    getAllCourseData = async (req)=>{
        const userToken = parseUserToken(req);
        try {
            // join with course id
            const joinCourseId = {
                $lookup : {
                    from : "courses",
                    localField : "course_id",
                    foreignField : "_id",
                    as : "data"
                }
            };

            // unwind data
            const unwind = { "$unwind" : "$data" };
            // projection
            const projection = {
                $project : {
                    "logo" : 1,
                    "title" : 1,
                    "description" : 1,
                    "data.course_name": 1,
                    "data.batch_no" : 1

                }
            };
            if (userToken.role==="admin"){
                let data = await getCourseModel.aggregate([
                    joinCourseId,
                    unwind,
                    projection
                ]);
                return {
                    status :"success",
                    data : data
                };
            }else {
                return {
                    status : "fail",
                    msg : "Permission not allow"
                };
            }
        }catch (e) {
            return {
                status : "fail",
                msg : e.toString()
            };
        }
    };
}

const getCourseService = new getCourseClass();

module.exports = getCourseService;