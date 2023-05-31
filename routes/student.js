const express = require('express');
const StudentModel = require('../models/StudentModel');
const router = express.Router();

router.get('/', async (req, res) => {
    var students = await StudentModel.find({});
    console.log(students)
    res.render("student/list", { students: students });
});

router.get('/detele/:id', async (req, res) => {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.redirect('/student');
});

router.get('/add', (req, res) => {
    res.render('student/add');
});

router.post('/add', async (req, res) => {
    var student = req.body;
    await StudentModel.create(student);
    res.redirect('/student');
});


module.exports = router;