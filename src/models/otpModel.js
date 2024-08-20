const mongoose = require('mongoose');
const { Schema,model } = mongoose;

const otpSchema = new Schema({
    otp : {
        type: Number,
        required: true,
    },
    status:{
        type:Number,
    },
    email:{
        type : String,
    }
},{timestamps:true,versionKey:false});
const otpModel = model("otp",otpSchema);

module.exports = otpModel;