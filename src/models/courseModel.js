const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const courseSchema = new Schema({
    course_name : {
        type : String,
        required : [true,"Course name required"],
        unique : [true,"always course name unique "]
    },
    course_img : {
        type : String,
        required : [true,"course_img required"]
    },
    instructor_name : {
        type :String,
        require:[true , "Instructor_name required " ]
    },
    instructor_img : {
        type : String,
        required:[true,"instructor_img required"]
    },
    total_sit : {
        type : Number,
        required : [true,"total sit requied"]
    },
    batch_no : {
        type : Number,
        required : [true,"batch not required"]
    }

},{timestamps:true,versionKey:false});


const courseModel = model("courses",courseSchema);

module.exports = courseModel;