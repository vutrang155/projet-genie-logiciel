const mongoose = require('mongoose');

const contact = mongoose.Schema({
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