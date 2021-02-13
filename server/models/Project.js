const mongoose = require('mongoose');

const project = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    state:{
        type: String,
        required: true,
        enum: ["TODO","FINISHED","WIP","ABANDONED"],
        default : 'TODO'
    },
    date_begin_prev:{
        type:Date,
        required: true,
    },
    date_end_prev:{
        type:Date,
        required: true,
    },
    date_begin_actual:{
        type:Date,
    },
    date_end_actual:{
        type:Date,
    },

});

module.exports = Project = mongoose.model('project',project)