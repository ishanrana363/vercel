const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const courseDetailsSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    title : {
        type : String,
        required : true
    },
    description : {
      type : String,
      required : true
    },
    rating  : {
        type : Number
    },
    course_fee : {
        type : Number,
        required : true
    },
    total_live_class : {
        type : Number
    },
    total_project : {
        type : Number,
        required : true
    },
    total_video : {
        type : Number,
        required : true
    },
    curriculum_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    get_course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    project_details_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    course_instructor_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    successful_student_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    feedback_student_id : {
        type : mongoose.Schema.Types.ObjectId
    }


},{
    timestamps:true,
    versionKey:false
});

const courseDetailsModel = model("courseDetailsData",courseDetailsSchema);

module.exports = courseDetailsModel;