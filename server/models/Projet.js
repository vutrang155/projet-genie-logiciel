const mongoose = require('mongoose');

const projet = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: 1,
    },
    responsableId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    contactId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    etat:{
        type: String,
        enum: ["Afaire","Encours","Termine","Abandonne"],
        required: true,
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
projet.pre('save', function(next) {
    const self = this;
    Object.keys(this.schema.paths).forEach(function(key) {
        if(self.schema.paths[key].options.default && self[key] === null) {
            self[key] = self.schema.paths[key].options.default;
        }
    });
    next();
});


module.exports = Project = mongoose.model('Projet',projet)
