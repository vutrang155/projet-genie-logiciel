const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const user = mongoose.Schema({
    userId: { type: String,
            required: true },
    password: { type: String,
                required: true,
                select: false },
    nom:{
        type: String,
        required: true,

    },
    prenom:{
        type: String,
        required: true,

    },
    adresse:{
        type: String,
    },
    numeroDeTelephone:{
        type: String,
    },
    adresseMail:{
        type: String,
    },
    dateEntree:{
        type:Date,
        default: Date.now
    },
    dateSortie:{
        type:Date,
    },
    compteActive:{
        type:Boolean,
    },
    role:{
        type: Number,
        enum: [1,2,3],
        default : 1
    }

});

user.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
};

user.methods.validPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

user.pre('save', function(next) {
    const self = this;
    Object.keys(this.schema.paths).forEach(function(key) {
        if(self.schema.paths[key].options.default && self[key] === null) {
            self[key] = self.schema.paths[key].options.default;
        }
    });
    next();
});

user.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = User = mongoose.model('user',user)