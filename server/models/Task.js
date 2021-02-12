const mongoose = require('mongoose');
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
    },
    date_begin_prev:{
        type:Date,
        required: true,
    },
    date_end_prev:{
        type:Date,
        required: true,
    },
    load_prev:{
        type:Number,
    },
    date_begin_actual:{
        type:Date,
    },
    date_end_actual:{
        type:Date,
    },
    load_actual:{
        type:Number,
    },
    progress:{
        type:Number,
    }


});
module.exports = Task = mongoose.model('task',task);