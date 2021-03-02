const mongoose = require('mongoose');
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Projet = require("../models/Projet");
const User = require("../models/User");
const Tache = require("../models/Tache");

const ERROR_CODE = 500;

exports.checkUser = async(id)=>{
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }

    var foundId =await User.find({ _id:id  });
    console.log(foundId);
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("User Unknown");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("User existe")
}
exports.checkUserByNomUtilisateur = async(id)=>{
    var foundId =await User.find({ nomUtilisateur:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("User Unknown");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("User existe")
}
exports.checkTache = async(id)=> {
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    var foundId =await Tache.find({ _id:id  });
    if (foundId === undefined || found.length  === 0) {
        const error = new Error("Tache id not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Tache existe")
}

exports.checkProjet = async(id)=> {
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    var foundId =await Projet.find({ _id:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Projet id not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Projet existe")
}

exports.checkClient = async(id)=> {
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    
    var foundId =await Client.find({ _id:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Client id not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Client existe")
}

exports.checkClientNom = async(nom)=> {
    var foundId =await Client.find({ nom:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Client nom not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Client existe")
}

exports.checkContact = async(id)=> {
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }

    var foundId =await Contact.find({ _id:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Client id not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Client existe")
}