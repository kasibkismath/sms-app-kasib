var mongoose = require('mongoose');

var studentDatabase = function () {

    // connect to mongodb
    var conn = mongoose.createConnection('mongodb://root:root@ds037155.mongolab.com:37155/studentapp');

    // schema definition
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;


    var StudentSchema = new Schema({
        firstName: String,
        lastName: String,
        age: Number,
        gender: String,
        course: String,
        contactNo: String
    });

    // function constructor
    var Student = conn.model('Student', StudentSchema);
    var stud = new Student;
    
    return Student;
};

module.exports = studentDatabase;