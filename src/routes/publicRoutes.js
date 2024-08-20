const express = require("express");

const router = express.Router();
// sign up controller
const signUpController = require("../controllers/userControllers");
// password reset controller
const passwordResetController = require("../controllers/passwordResetController");
//course details controller
const courseDetailsController = require("../controllers/courseDetailsController");
// course controller
const courseController =  require("../controllers/courseControllers");
// curriculum controller
const curriculumController = require("../controllers/curriculamController");
//project controller
const projectController = require("../controllers/projectController");
//instructor controller
const instructorController = require("../controllers/instructorController");
// course successful controller
const courseSuccessfulStudentController = require("../controllers/courseSuccessfullStudent")
// Learner feedback controller
const learnerFeedbackController = require("../controllers/larnerFeedbackController");



// user routes

router.post("/user/sign-up",signUpController.signUp);
router.post("/user/login", signUpController.login);

// password reset routes

router.get("/send-email/:email", passwordResetController.sendEmailUser);
router.get("/otp-verify", passwordResetController.verifyOtpCode);
router.get("/password-set", passwordResetController.setNewPassword );

//course api

router.get("/get/all/course", courseController.getAllCourse);

// course details api

router.get("/all/course/details", courseDetailsController.getAllCourseDetails );

// curriculum api

router.get("/all/curriculum", curriculumController.getAllCurriculum);

// project api

router.get("/all/project",projectController.projectDetails);

// instructor api

router.get("/all/instructor", instructorController.allInstructor);

//courseSuccessfulStudentController api

router.get("/all/student", courseSuccessfulStudentController.allStudent);

router.get("/test", (req, res) => {
    res.send("you can access public routes");
})

// Learner feedback controller api

router.get("/all/feedback", learnerFeedbackController.allFeedback);


module.exports = router;