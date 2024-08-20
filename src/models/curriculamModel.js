const mongoose = require("mongoose");
const test = require("node:test");
const {text} = require("express");

const {Schema,model} = mongoose;

const curriculumSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    record_video : {
        type : String,
        required : true
    },
    live_class : {
        type : String,
        required : true
    },
    quiz : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true

    },
    description : {
        type :String,
        required : true
    }
},{
    timestamps:true,
    versionKey:false
});

const curriculumModel = model("curriculum",curriculumSchema);

module.exports = curriculumModel;