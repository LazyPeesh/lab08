const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema(
    {
        name: String,
        birth_year: Number,
        email: String,
        grade: Number,
        gender: String,
        image: String
    }
);

const StudentModel = mongoose.model("Student", StudentSchema, "student");
module.exports = StudentModel;
