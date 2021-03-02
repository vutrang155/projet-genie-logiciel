const mongoose = require('mongoose');
const tache = mongoose.Schema({
    nom:{
        type: String,
        required: true,
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
    predecesseur:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tache'
    }],
    chargeConsommee:{
        type:Number,
    },
    avancement:{
        type:Number,
    }

});
tache.index({nom:1, projetId:1}, { unique: true });


module.exports = Tache = mongoose.model('Tache',tache);