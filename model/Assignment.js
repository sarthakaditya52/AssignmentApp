const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignSchema = new Schema({
    day: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    }
});

module.exports = Assignment = mongoose.model('assignment', AssignSchema);