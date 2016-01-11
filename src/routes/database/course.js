var mongoose = require('mongoose');

var courseDatabase = function () {

    // connect to mongodb
    var conn = mongoose.createConnection('mongodb://root:root@ds037155.mongolab.com:37155/studentapp');

    // schema definition
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;


    var CourseSchema = new Schema({
        courseName: String,
        credits: Number,
        years: Number,
        department: String,
        coordinator: String,
    });

    // function constructor
    var Course = conn.model('Course', CourseSchema);
    var cour = new Course;
    
    return Course;
};

module.exports = courseDatabase;