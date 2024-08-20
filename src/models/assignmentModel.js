const mongoose = require("mongoose");
const {Schema,model} = mongoose;
const assignmentSchema = new Schema({
    assignment_name : {
        type : String,
        require : [true, "assignment name required" ]
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    module_id : {
        type : mongoose.Schema.Types.ObjectId
    },
},{
    timestamps : true,
    versionKey : false
});


const assignmentModel = model("assignments",assignmentSchema);

module.exports = assignmentModel;