const mongoose = require('mongoose');

const contact = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    }
});
module.exports = Contact = mongoose.model('contact',contact)