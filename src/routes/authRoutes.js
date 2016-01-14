var express = require('express');
var authRouter = express.Router();
var User = require('./database/user')();
var passport = require('passport');

var routes = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            if (req.body.username === "" || req.body.password === "") {
                res.redirect('/');
            } else {
                var newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                newUser.save(function (err, user) {
                    if (err) return console.error(err);
                    req.login(user, function () {
                        res.redirect('/students');
                    });
                });
            }
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
                failureRedirect: '/'
            }),
            function (req, res) {
                res.redirect('/dashboard');
            });
    authRouter.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    return authRouter;
};

module.exports = routes;