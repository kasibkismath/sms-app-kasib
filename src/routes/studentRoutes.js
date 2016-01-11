var express = require('express');

var studentRouter = express.Router();

var Student = require('./database/student')();

var routes = function (navLinks) {
    
    var currUser;

    studentRouter.use(function (req, res, next) {
        
        if (!req.user) {
            res.redirect('/');
        }
        
         if(req.user)
            currUser = req.user.username;
        
        next();
    });

    studentRouter.route('/')
        .get(function (req, res) {
            Student.find({}, function (err, students) {
                res.render('studentListView', {
                    nav: navLinks,
                    title: 'Students',
                    students: students,
                    user : currUser
                });
            }).sort({
                "firstName": 1
            });
        });
    studentRouter.route('/:id')
        .get(function (req, res) {
            // objectId
            var id = req.params.id;
            Student.findOne({
                _id: id
            }, function (err, student) {
                res.render('studentView', {
                    nav: navLinks,
                    title: 'Student',
                    student: student,
                    user : currUser
                });
            });
        });
    studentRouter.route('/add')
        .post(function (req, res) {
            var newStudent = new Student({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender,
                contactNo: req.body.contactNo,
                course: req.body.course
            });
            newStudent.save(function (err, student) {
                if (err) return console.error(err);
                res.redirect('/students');
            });
        });
    studentRouter.route('/update/:id')
        .post(function (req, res) {
            var updateId = req.params.id,
                firstName = req.body.firstName,
                lastName = req.body.lastName,
                age = req.body.age,
                gender = req.body.gender,
                contactNo = req.body.contactNo,
                course = req.body.course;
            Student.update({
                _id: updateId
            }, {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                    contactNo: contactNo,
                    course: course
                }
            }, {
                upsert: true
            }, function (err, noOfRowsAffected) {
                res.redirect('/students/' + updateId);

            });
        });
    studentRouter.route('/delete/:id')
        .delete(function (req, res) {
            var deleteId = req.params.id;
            Student.remove({
                _id: deleteId
            }, function (err, student) {
                res.status('200').send();
            });
        });
    return studentRouter;
};

module.exports = routes;