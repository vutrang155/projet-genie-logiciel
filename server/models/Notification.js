const mongoose = require('mongoose');

const notification = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    type:{
        type: String,
        required: true,
        enum: [],
    },
    message:{
        type:String
    }

})
module.exports = Notification = mongoose.model('notification',notification)