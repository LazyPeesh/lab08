const express = require('express');
const StudentModel = require('../models/StudentModel');
const router = express.Router();

router.get('/', async (req, res) => {
    var students = await StudentModel.find({});
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

router.get('/edit/:id', async (req, res) => {
    var students = await StudentModel.findById(req.params.id);
    res.render('student/edit', { students: students });
});

router.post('/edit/:id', async (req, res) => {

    var data = req.body;
    var id = req.params.id;
    var student = await StudentModel.findByIdAndUpdate(id, data);
    res.redirect('/student');
})


module.exports = router;