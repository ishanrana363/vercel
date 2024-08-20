const express = require("express");
const router = express.Router();

// user controller
const userController = require("../controllers/userControllers");
// course controller
const courseController = require("../controllers/courseControllers");
// auth  middleware
const authMiddleware = require("../middleware/authMiddleware")
// course details controller
const courseDetailsController = require("../controllers/courseDetailsController");
// curriculum controller
const curriculumController = require("../controllers/curriculamController");
// get controller
const courseGetController = require("../controllers/getController");
// project controller
const projectController = require("../controllers/projectController");
// instructor controller
const instructorController = require("../controllers/instructorController");
// course successful controller
const courseSuccessfulStudentController = require("../controllers/courseSuccessfullStudent")
//learnerFeedback controller
const learnerFeedbackController = require("../controllers/larnerFeedbackController");
// module controller
const moduleController = require("../controllers/moduleControllers");
// assignment controller
const assignmentController = require("../controllers/assignmentController");


// user api

router.put("/user/profile/update", authMiddleware.isValidUser, userController.updateUser);
router.delete("/user/profile/delete/:id", authMiddleware.isValidUser, userController.deleteUser)
router.get("/user/profile/update", authMiddleware.isValidUser, userController.singleUserProfile);
router.get("/all/user/profile", authMiddleware.isValidUser, userController.allUser);

// course api

router.post("/course/create", authMiddleware.isValidUser, courseController.courseCreate);
router.put("/course/update/:id", authMiddleware.isValidUser,courseController.courseUpdate);
router.delete("/course/delete/:id" , authMiddleware.isValidUser, courseController.courseDelete);

// course details api

router.post("/course/details/created", authMiddleware.isValidUser, courseDetailsController.createCourseDetails);
router.put("/course/details/update/:id", authMiddleware.isValidUser, courseDetailsController.courseDetailsUpdate);
router.delete("/course/details/delete/:id", authMiddleware.isValidUser, courseDetailsController.courseDetailsDelete);

// curriculum api

router.post("/curriculum/create", authMiddleware.isValidUser, curriculumController.createCurriculum);
router.put("/curriculum/update/:id" , authMiddleware.isValidUser, curriculumController.updateCurriculum);
router.delete("/curriculum/delete/:id", authMiddleware.isValidUser, curriculumController.curriculumDelete);

// course get api

router.post("/get/course/create", authMiddleware.isValidUser, courseGetController.create);
router.put("/get/course/update/:id" , authMiddleware.isValidUser, courseGetController.update);
router.get("/get/all/course/data", authMiddleware.isValidUser , courseGetController.getAll);
router.delete("/get/course/delete/:id", authMiddleware.isValidUser, courseGetController.deleteData);

// project api

router.post("/project/create", authMiddleware.isValidUser, projectController.projectCreate);
router.put("/project/update/:id",authMiddleware.isValidUser, projectController.projectUpdate);
router.delete("/project/delete/:id", authMiddleware.isValidUser, projectController.projectDelete);

// instructor api

router.post("/instructor/create", authMiddleware.isValidUser, instructorController.instructorCreate);
router.put("/instructor/update/:id", authMiddleware.isValidUser, instructorController.instructorUpdate);
router.delete("/instructor/delete/:id", authMiddleware.isValidUser, instructorController.instructorDelete);

// course Successful student api

router.post("/student/create", authMiddleware.isValidUser, courseSuccessfulStudentController.create);
router.put("/student/update/:id", authMiddleware.isValidUser, courseSuccessfulStudentController.update );
router.delete("/student/delete/:id", authMiddleware.isValidUser, courseSuccessfulStudentController.deleteStudent);

// feedback api

router.post("/feedback/create", authMiddleware.isValidUser, learnerFeedbackController.create);
router.put("/feedback/update/:id", authMiddleware.isValidUser, learnerFeedbackController.update)
router.delete("/feedback/delete/:id" , authMiddleware.isValidUser, learnerFeedbackController.deleteFeedback);

// module api

router.post("/module/create", authMiddleware.isValidUser, moduleController.moduleCreate);
router.put("/module/update/:id", authMiddleware.isValidUser, moduleController.moduleUpdate);
router.delete("/module/delete/:id", authMiddleware.isValidUser, moduleController.moduleDelete);
router.get("/all/module", authMiddleware.isValidUser, moduleController.allModule);

// assignment api

router.post("/assignment/create", authMiddleware.isValidUser , assignmentController.createAssignment);
router.put("/assignment/update/:id", authMiddleware.isValidUser , assignmentController.updateAssignment);
router.delete("/assignment/delete/:id", authMiddleware.isValidUser, assignmentController.deleteAssignment);
router.get("/single/assignment/:id", authMiddleware.isValidUser, assignmentController.singleAssignment);
router.get("/all/assignment", authMiddleware.isValidUser, assignmentController.allAssignment);




module.exports = router;