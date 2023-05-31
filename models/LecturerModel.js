const mongoose = require('mongoose');
const LecturerSchema = mongoose.Schema(
    {
        name: String,
        birth_year: Number,
        email: String,
        course: String,
        gender: String,
        image: String
    }
);

const LecturerModel = mongoose.model("Lecturer", LecturerSchema, "lecturer");
module.exports = LecturerModel;
