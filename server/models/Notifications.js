const mongoose = require('mongoose');

const notifications = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    }
})
module.exports = Notifications = mongoose.model('notifications',notifications)