const mongoose = require('mongoose');
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Projet = require("../models/Projet");
const User = require("../models/User");
const Tache = require("../models/Tache");

const ERROR_CODE = 500;

/**
 * Vérifier si l'utilisateur existe. Sinon lance une exception
 * @param id userId
 **/ 
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

/**
 * Vérifier si l'utilisateur existe. Sinon lance une exception
 * @param id le nomUtilisateur 
 **/ 
exports.checkUserByNomUtilisateur = async(id)=>{
    var foundId =await User.find({ nomUtilisateur:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("User Unknown");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("User existe")
}

/**
 * Vérifier si la tâche existe. Sinon lance une exception
 * @param id tacheId 
 **/ 
exports.checkTache = async(id)=> {
    var cond = mongoose.isValidObjectId(id);
    if (!cond) {
        const error = new Error("Invalid format");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    var foundId =await Tache.find({ _id:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Tache id not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Tache existe")
}

/**
 * Vérifier si le projet existe. Sinon lance une exception
 * @param id projetId 
 **/ 
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

/**
 * Vérifier si le client existe. Sinon lance une exception
 * @param id clientId 
 **/ 
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

/**
 * Vérifier si le client existe. Sinon lance une exception
 * @param id le nom du client 
 **/ 
exports.checkClientNom = async(nom)=> {
    var foundId =await Client.find({ nom:id  });
    if (foundId === undefined || foundId.length  === 0) {
        const error = new Error("Client nom not found");
        error.statusCode = ERROR_CODE;
        throw error;
    }
    console.log("Client existe")
}

/**
 * Vérifier si le contact existe. Sinon lance une exception
 * @param id contactId 
 **/ 
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
    console.log("Contact existe")
}