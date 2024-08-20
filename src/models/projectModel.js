const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const projectSchema = new Schema({
    project_img : {
        type : String,
        required : [true,"Project img required"]
    },
    project_name : {
        type : String,
        required : [true , "Project name required"]
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
},{
    timestamps:true,
    versionKey:false
});

const projectModel = model("project",projectSchema);

module.exports = projectModel