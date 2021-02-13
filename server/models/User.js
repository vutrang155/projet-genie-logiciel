const mongoose = require('mongoose');

const user = mongoose.Schema({
    lastname:{
        type: String,
        required: true,
        unique: 1,
    },
    firstname:{
        type: String,
        required: true,
        unique: 1,
    },
    entry_date:{
        type:Date,
        required: true,
        default: Date.now
    },
    exit_date:{
        type:Date,
    },
    active:{
        type:Boolean
    }


});

module.exports = User = mongoose.model('user',user)