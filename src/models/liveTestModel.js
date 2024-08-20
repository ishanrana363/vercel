const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const liveTestSchema = new Schema({
    live_test_name : {
        type : String,
        required : [true, "live test name required" ],
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    module_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

},{
    timestamps:true,
    versionKey:false
});

const liveTestModel = model("liveTestData",liveTestSchema);

module.exports = liveTestModel;