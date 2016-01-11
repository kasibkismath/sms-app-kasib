var express = require('express');

var dashboardRouter = express.Router();

var Student = require('./database/student')();

var routes = function (navLinks) {

    var currUser;

    dashboardRouter.use(function (req, res, next) {

        if (!req.user) {
            res.redirect('/');
        }

        if (req.user)
            currUser = req.user.username;

        next();
    });

    dashboardRouter.route('/')
        .get(function (req, res) {
            res.render('dashboard', {
                nav: navLinks,
                title: 'Dashboard',
                user: currUser
            });
        });

    dashboardRouter.route('/test')
        .get(function (req, res) {
            Student.aggregate({
                $group: {
                    _id: "$course",
                    total: {
                        $sum: 1
                    }
                }
            }, function (err, result) {
                res.json(result);
            });
        });
    return dashboardRouter;
};

module.exports = routes;