const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const liveClassSchema = new Schema({
    live_class_name : {
        type : String
    },
    link_live_class : {
        type : String
    }
},{
    timestamps:true,
    versionKey:false
});

const liveClassModel = model("liveClass",liveClassSchema);

module.exports = liveClassModel