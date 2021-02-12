const mongoose = require('mongoose');

const user = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    }
});

module.exports = User = mongoose.model('user',user)