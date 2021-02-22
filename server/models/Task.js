const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
const task = mongoose.Schema({
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
    description:{
        type:String
    },/*
    dateBeginPrev:{
        type:Date,
        required: true,
    },
    dateEndPrev:{
        type:Date,
        required: true,
    },
    loadPrev:{
        type:Number,
    },
    dateBeginActual:{
        type:Date,
    },
    dateEndActual:{
        type:Date,
    },
    loadActual:{
        type:Number,
    },
    progress:{
        type:Number,
    }

*/
});
//task.plugin(autoIncrement.plugin, 'task');

module.exports = Task = mongoose.model('task',task);