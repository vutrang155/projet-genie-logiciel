const mongoose = require('mongoose');

const project = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    }
});

module.exports = Project = mongoose.model('project',project)