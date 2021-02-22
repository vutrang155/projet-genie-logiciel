const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const user = mongoose.Schema({
    name: { type: String,
        required: true },
    password: { type: String,
                required: true,
                select: false }/*
    lastName:{
        type: String,
        required: true,
        unique: 1,
    },
    firstName:{
        type: String,
        required: true,
        unique: 1,
    },
    entryDate:{
        type:Date,
        required: true,
        default: Date.now
    },
    exitDate:{
        type:Date,
    },
    active:{
        type:Boolean
    }*/


});

user.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
};

user.methods.validPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User = mongoose.model('user',user)