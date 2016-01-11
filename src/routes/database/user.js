var mongoose = require('mongoose');

var userDatabase = function () {

    // connect to mongodb
    var conn = mongoose.createConnection('mongodb://root:root@ds037155.mongolab.com:37155/studentapp');

    // schema definition
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;


    var UserSchema = new Schema({
        username : String,
        password : String
    });

    // function constructor
    var User = conn.model('User', UserSchema);
    var user = new User;
    
    return User;
};

module.exports = userDatabase;