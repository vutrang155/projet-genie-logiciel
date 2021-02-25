const mongoose = require('mongoose');

const projet = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: 1,
    },
    etat:{
        type: Number,
        enum: [0,1,2,3],
        default : 0
    },
    dateDebutPrevisionnelle:{
        type:Date,
    },
    dateFinPrevisionnelle:{
        type:Date,
    },
    dateDebutReelle:{
        type:Date,
    },
    dateFinReelle:{
        type:Date,
    },

});

module.exports = Project = mongoose.model('Project',projet)