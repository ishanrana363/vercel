const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const getCourseSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    logo : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }

},{
    timestamps:true,
    versionKey:false
});

const getCourseModel = model("getCourseData", getCourseSchema);

module.exports = getCourseModel;