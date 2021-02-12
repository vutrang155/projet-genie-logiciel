const mongoose = require('mongoose');
const client = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    }
})
module.exports = Client = mongoose.model('client',client)