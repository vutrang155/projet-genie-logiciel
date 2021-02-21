const mongoose = require('mongoose');

const contact = mongoose.Schema({
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
    job:{
        type: String,
        required: true,
        unique: 1,
    },
    address:{
        type:String
    }
});
module.exports = Contact = mongoose.model('contact',contact)