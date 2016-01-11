var express = require('express');

var courseRouter = express.Router();

var Course = require('./database/course')();

var routes = function (navLinks) {
    
    var currUser;

    courseRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        
        if(req.user)
            currUser = req.user.username;
        
        next();
    });


    courseRouter.route('/')
        .get(function (req, res) {
            Course.find({}, function (err, courses) {
                res.render('courseListView', {
                    nav: navLinks,
                    title: 'Courses',
                    courses: courses,
                    user : currUser
                });
            }).sort({
                "courseName": 1
            });
        });
    courseRouter.route('/:id')
        .get(function (req, res) {
            // objectId
            var id = req.params.id;
            Course.findOne({
                _id: id
            }, function (err, course) {
                res.render('courseView', {
                    nav: navLinks,
                    title: 'Course',
                    course: course,
                    user : currUser
                });
            });
        });
    courseRouter.route('/add')
        .post(function (req, res) {
            var newCourse = new Course({
                courseName: req.body.courseName,
                credits: req.body.credits,
                years: req.body.years,
                department: req.body.department,
                coordinator: req.body.coordinator
            });
            newCourse.save(function (err, course) {
                if (err) return console.error(err);
                res.redirect('/courses');
            });
        });
    courseRouter.route('/update/:id')
        .post(function (req, res) {
            var updateId = req.params.id,
                courseName = req.body.courseName,
                credits = req.body.credits,
                years = req.body.years,
                department = req.body.department,
                coordinator = req.body.coordinator;
            Course.update({
                _id: updateId
            }, {
                $set: {
                    courseName: courseName,
                    credits: credits,
                    years: years,
                    department: department,
                    coordinator: coordinator
                }
            }, {
                upsert: true
            }, function (err, noOfRowsAffected) {
                res.redirect('/courses/' + updateId);

            });
        });
    courseRouter.route('/delete/:id')
        .delete(function (req, res) {
            var deleteId = req.params.id;
            Course.remove({
                _id: deleteId
            }, function (err, course) {
                res.status('200').send();
            });
        });
    return courseRouter;
};

module.exports = routes;