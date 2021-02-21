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
    dateBeginPrev:{
        type:Date,
        required: true,
    },
    dateEndPrev:{
        type:Date,
        required: true,
    },
    dateBeginActual:{
        type:Date,
    },
    dateEndActual:{
        type:Date,
    },

});

module.exports = Project = mongoose.model('project',project)