const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const instructorSchema = new Schema({
    instructor_name : {
        type : String,
        required : true
    },
    instructor_img : {
        type : String,
        required : true
    },
    instructor_role : {
        type : String,
        require : true
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId  ,
        required : true
    }
},{timestamps:true,versionKey:false});

const instructorModel = model("instructors",instructorSchema);

module.exports = instructorModel;