const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const resourceSchema = new Schema({
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    module_id : {
        type : String,
        required : true
    },
    name_of_resource : {
        type : String,
        required : true
    },
    github_link : {
        type : String
    }
},{
    timestamps:true,
    versionKey:false
});

const resourceModel = model("resource",resourceSchema);

module.exports = resourceModel;