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
        unique: 1,
    },
    prenom:{
        type: String,
        required: true,
        unique: 1,
    },
    dateEntree:{
        type:Date,
        default: Date.now
    },
    dateSortie:{
        type:Date,
    },
    compteActive:{
        type:Boolean
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

module.exports = User = mongoose.model('user',user)