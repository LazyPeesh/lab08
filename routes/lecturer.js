const express = require('express');
const LecturerModel = require('../models/LecturerModel');
const router = express.Router();

router.get('/', async (req, res) => {
    var lecturers = await LecturerModel.find({});
    res.render('lecturer/list', { lecturers: lecturers });
});

router.get('/add', (req, res) => {
    res.render('lecturer/add');
});

router.post('/add', async (req, res) => {
    var lecturer = req.body;
    await LecturerModel.create(lecturer);
    res.redirect('/lecturer');
});

router.get('/delete/:id', async (req, res) => {
    await LecturerModel.findByIdAndRemove(req.params.id);
    res.redirect('/lecturer');
});

router.get('/edit/:id', async (req, res) => {
    var lecturers = await LecturerModel.findById(req.params.id);
    res.render('lecturer/edit', { lecturers: lecturers });
});

router.post('/edit/:id', async (req, res) => {
    var data = req.body;
    var id = req.params.id;

    await LecturerModel.findByIdAndUpdate(id, data);
    res.redirect('/lecturer');
});


module.exports = router;