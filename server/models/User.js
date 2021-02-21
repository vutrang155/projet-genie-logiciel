const mongoose = require('mongoose');

const user = mongoose.Schema({
    lastName:{
        type: String,
        required: true,
        unique: 1,
    },
    firstName:{
        type: String,
        required: true,
        unique: 1,
    },
    entryDate:{
        type:Date,
        required: true,
        default: Date.now
    },
    exitDate:{
        type:Date,
    },
    active:{
        type:Boolean
    }


});

module.exports = User = mongoose.model('user',user)