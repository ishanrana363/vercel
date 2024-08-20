const userModel= require("../models/userModel");
const jwt = require("jsonwebtoken");
const {parseUserToken} = require("../helper/helper")
const bcrypt = require('bcrypt');
class signUpClass {
    signUp = async (req, res) => {
        try {
            const { name, email, phone_number, password, img } = req.body;
            // Check for missing fields
            if (!name) {
                return res.status(428).json({ status : "fail", msg : "User name required" });
            }
            if (!email) {
                return res.status(428).json({ status : "fail", msg : "User email required" });
            }
            if (!phone_number) {
                return res.status(428).json({ status : "fail", msg : "User phone number required" });
            }
            if (!password) {
                return res.status(428).json({ status : "fail", msg : "User password required" });
            }
            if (!img) {
                return res.status(428).json({ status : "fail", msg : "User img required" });
            }
            // Check if the user already exists
            const userEmail = await userModel.findOne({ email });
            const phoneNumber = await userModel.findOne({ phone_number });
            if (userEmail) {
                return res.status(409).json({ status : "fail", msg : "User email already exists" });
            }
            if (phoneNumber) {
                return res.status(409).json({ status : "fail", msg : "Phone number already exists" });
            }
            // Generate a random 6-digit ID
            const userId = Math.floor(100000 + Math.random() * 900000);
            let reqBodyData = {
                name,
                email,
                phone_number,
                password,
                img,
                id : userId
            };
            // Save the user and return success response
            const data = await userModel.create(reqBodyData);
            return res.status(201).json({ status : "success", data : data });
        } catch (e) {
            // Handle any errors
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    login = async (req,res)=>{
        try {
            require("dotenv").config();
            const key = process.env.AUTH_SECRET;
            let password = req.body.password;
            let email = req.body.email;
            let user = await userModel.findOne({email:email});
            if(!user){
                return res.status(404).json({
                    status : "fail",
                    msg : "User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            let payload = {
                id : user._id,
                role : user.role,
                email : user.email,
                exp : Math.floor(Date.now() / 1000 + 24 * 60 * 60),
            };
            const token = jwt.sign(payload,key);
            if (isMatch){
                return res.status(200).json({
                    status : "success",
                    token : `Bearer ${token}`
                });
            }else {
                return res.status(404).json({
                    status : "fail",
                    msg : "User not found"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    updateUser = async (req,res)=>{
        const userToken = parseUserToken(req)
        try {
            let name = req.body.name;
            let email = req.body.email;
            let img = req.body.img;
            let matchStage = { _id : userToken.id };
            let update = {
                name : name,
                email : email,
                img : img
            };
            if(userToken.role==="user" || userToken.role==="admin"){
                await userModel.findByIdAndUpdate(matchStage,update);
                return res.status(200).json({
                    status : "success",
                    msg : "User update successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
    deleteUser = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = {
                _id : id
            };
            const userData = await userModel.findOne(filter);
            if (!userData) return res.status(404).send({
                status : "fail",
                msg : "User data not found"
            });
            if ((userData.role==="admin")){
                await userModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "User data delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "You have not allow permission"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : 'fail',
                msg : e.toString()
            });
        }
    };
    singleUserProfile = async (req, res) => {
        const userToken = parseUserToken(req);
        const authEmail = userToken.email;
        try {
            let filter = {email : authEmail};
            let userData = await userModel.findOne(filter);
            if (userData) {
                return res.status(200).json({
                    status : "success",
                    data : userData
                });
            }else {
                return res.status(404).json({
                    status : "fail",
                    msg : "User profile not found"
                });
            }
        } catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
     allUser = async (req, res) => {
         try {
             let userToken = parseUserToken(req);
             if (userToken.role==="admin"){
                 let data = await userModel.find();
                 return res.status(200).json({
                     status : "success",
                     data : data
                 });
             }else {
                 return res.status(403).json({
                     status : "fail",
                     msg : "Permission not allow"
                 });
             }
         }catch (e) {
             return res.status(500).json({
                 status : "fail",
                 msg : e.toString()
             });
         }
     };
}

const signUpController = new signUpClass();
module.exports = signUpController;