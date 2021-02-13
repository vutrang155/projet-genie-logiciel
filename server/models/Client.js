const mongoose = require('mongoose');
const client = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    field_of_activity:{
        type:String
    },
    address:{
        type:String
    }
})
module.exports = Client = mongoose.model('client',client)