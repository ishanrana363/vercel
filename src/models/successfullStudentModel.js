const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const successfulStudentSchema = new Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId, // Corrected 'tye' to 'type'
        ref: "Course", // Optional: Add ref if this ObjectId references another collection
    },
    student_name: {
        type: String,
        required: [true, "Student name required"]
    },
    batch_no: {
        type: Number,
        required: true
    },
    position_of_job: { // Corrected 'position_of_jon' to 'position_of_job'
        type: String
    },
}, {
    timestamps: true,
    versionKey: false
});

const SuccessfulStudentModel = model("successfulStudent", successfulStudentSchema);

module.exports = SuccessfulStudentModel;
