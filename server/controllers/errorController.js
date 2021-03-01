const mongoose = require('mongoose');
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Projet = require("../models/Projet");
const User = require("../models/User");
const Tache = require("../models/Tache");


exports.checkUser = async(id)=>{
    var foundId =await User.find({ _id:id  });
    if (foundId === undefined || id.length  === 0) {
        const error = new Error("User Unknown");
        error.statusCode = 404;
        throw error;
    }
    console.log("User existe")
}

