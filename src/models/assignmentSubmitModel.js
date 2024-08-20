const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const assignmentSubmitSchema = new Schema({
    github_link : {
        type : String,
        required : [true, "Assignment link required"]
    }
},{
    timestamps:true,
    versionKey:false
});

const assignmentSubmitModel = model("assignmentSubmitData",assignmentSubmitSchema);

module.exports = assignmentSubmitModel;