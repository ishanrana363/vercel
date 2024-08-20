const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const moduleSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId
    },
    module_name : {
        type : String,
        required : true,
        unique:true
    },
    module_topic : {
        type : String,
        required : true,
        unique : true
    },
    total_days_module : {
        type : Number,
        require : true
    },
    total_live_class : {
        type : Number,
        required : true
    },
    total_assignment : {
        type : Number,
        required : true,

    },
    total_pre_record_video : {
        type : Number,
        required:true
    },
    total_quiz : {
        type : Number,
        require : true
    },

},{timestamps:true,versionKey:false});

const moduleModel = model("modules",moduleSchema);

module.exports = moduleModel;