const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const instructorDetailsSchema = new Schema({
    instructor_img : {
        type : String
    },
    instructor_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    description : {
        type : String
    },
    experience : {
        type : String
    },
    technology : {
        type : String
    },
    achivement : {
        type : String
    }
},{
    timestamps:true,
    versionKey:false
});

const instructorDetailsModel = model("instructorDetails",instructorDetailsSchema);
module.exports = instructorDetailsModel;