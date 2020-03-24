const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Assignment = require('./Assignment');

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    assignments: {
        type: [Assignment.ObjectId],
        required: true
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);