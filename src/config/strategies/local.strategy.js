var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../routes/database/user')();


module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if(user === null){
                    done(null, false, {message : 'User not found'});
                } else if(user.password === password) {
                    var user = user;
                    done(null, user);
                } else if (user.username === username && user.password != password) {
                    done(null, false, {message : 'User not found'})
                }
            });
        }
    ));
};