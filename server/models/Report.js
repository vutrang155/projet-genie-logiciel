const mongoose = require('mongoose');

const report = mongoose.Schema({
    date:{
        type:Date,
        required: true,
        default: Date.now
    },
    progress:{
        type:Number,
    },
    comment:{
        type:String
    }

})
module.exports = Report = mongoose.model('Report',report)