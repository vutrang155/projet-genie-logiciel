const mongoose = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
const tache = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: 1,
        trim: true
    },
    responsableId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projetId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projet'
    },
    etat:{
        type: Number,
        required: true, // enum: ["TODO","FINISHED","WIP","ABANDONED"], default : 'TODO'
    },
    description: {
        type: String
    },
    dateDebutPrevisionnelle:{
        type:Date,
        required: true,
    },
    dateFinPrevisionnelle:{
        type:Date,
        required: true,
    },
    chargeAssociee:{
        type:Number,
    },
    dateDebutReelle:{
        type:Date,
    },
    dateFinReelle:{
        type:Date,
    },
    chargeConsommee:{
        type:Number,
    },
    avancement:{
        type:Number,
    }

});


module.exports = Tache = mongoose.model('Tache',tache);