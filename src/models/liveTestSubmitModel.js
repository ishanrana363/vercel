const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const liveTestSubmitSchema = new Schema({
    github_link : {
        type : String,
        required : true
    }
},{
    timestamps:true,
    versionKey:false
});

const liveTestSubmitModel = model("liveTestSubmit",liveTestSubmitSchema);

module.exports = liveTestSubmitModel;