const courseDetailsModel = require("../models/courseDetailsModel");
const { parseUserToken } = require("../helper/helper");
const courseDetailsService = require("../services/courseDetailsService")
const mongoose = require("mongoose");

class courseDetailsClass {
    createCourseDetails = async (req, res) => {
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role === "admin") {
                let data = await courseDetailsModel.create(reqBody);
                return res.status(201).json({
                    status: "success",
                    data: data
                });
            } else {
                return res.status(403).json({
                    status: "fail",
                    msg: "Permission not allow"
                });
            }
        } catch (e) {
            return res.status(500).json({
                status: 'fail',
                msg: e.toString()
            });
        }
    };
    courseDetailsUpdate = async (req, res) => {
        let userToken = parseUserToken(req);
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let filter = { _id: id };
            let update = {
                title: req.body.title,
                description: req.body.description,
                rating: req.body.rating,
                course_fee: req.body.course_fee,
                total_live_class: req.body.total_live_class,
                total_project: req.body.total_project,
                total_video: req.body.total_video
            }
            let data = await courseDetailsModel.findById(filter);
            if (!data) {
                return res.status(404).json({
                    status: "fail",
                    msg: "Data not found"
                });
            }
            if (userToken.role === "admin") {
                await courseDetailsModel.findByIdAndUpdate(filter, update);
                return res.status(200).json({
                    status: "success",
                    msg: "Update successfully"
                });
            } else {
                return res.status(403).json({
                    status: "fail",
                    msg: "Permission not allow"
                });
            }

        } catch (e) {
            return res.status(500).json({
                status: "fail",
                msg: e.toString()
            });
        }
    };
    courseDetailsDelete = async (req, res) => {
        let userToken = parseUserToken(req)
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let filter = { _id: id };
            let data = await courseDetailsModel.findById(filter);
            if (!data) return res.status(404).json({
                status: "fail",
                msg: "Data not found"
            });

            if (userToken.role === "admin") {
                await courseDetailsModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status: "success",
                    msg: "Data delete successfully"
                });
            } else {
                return res.status(403).json({
                    status: "fail",
                    msg: "Permission not allow"
                });
            }

        } catch (e) {
            return res.status(500).json({
                status: "fail",
                msg: e.toString()
            });
        }
    }

    getAllCourseDetails = async (req, res) => {
        try {
            let result = await courseDetailsService.getAllCourseDetails(req);
            return res.status(200).send(result);
        } catch (e) {
            return res.status(500).send({
                status: "fail",
                msg: e.toString()
            });
        }
    }

}

const courseDetailsController = new courseDetailsClass();

module.exports = courseDetailsController;