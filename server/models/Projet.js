const mongoose = require('mongoose');

const projet = mongoose.Schema({
    nom:{
        type: String,
        required: true,
        unique: 1,
    },
    responsableId:{
        type: String,
        ref: 'User'
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    contactId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
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
projet.pre('save', function(next) {
    const self = this;
    Object.keys(this.schema.paths).forEach(function(key) {
        if(self.schema.paths[key].options.default && self[key] === null) {
            self[key] = self.schema.paths[key].options.default;
        }
    });
    next();
});
module.exports = Project = mongoose.model('Project',projet)