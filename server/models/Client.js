const mongoose = require('mongoose');
const client = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    domaine:{
        type:String
    },
    adresse:{
        type:String
    }
})
module.exports = Client = mongoose.model('Client',client)