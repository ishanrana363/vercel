const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const moduleDetailsSchema = new Schema({
    module_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    live_class_id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    assignment_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    live_test_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    quiz_test_id : {
        type : mongoose.Schema.Types.ObjectId,
    }

},{timestamps:true,versionKey:false});


const moduleDetailsModel = model("moduleDetails", moduleDetailsSchema);

module.exports = moduleDetailsModel;