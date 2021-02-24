const mongoose = require('mongoose');

const contact = mongoose.Schema({
    nom:{
        type: String,
        required: true,
    },
    prenom:{
        type: String,
        required: true,
    },
    fonction:{
        type: String,
    },
    adresse:{
        type:String
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
});
module.exports = Contact = mongoose.model('contact',contact)