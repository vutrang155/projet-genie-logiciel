const jwt =require('jsonwebtoken');
const config = require("../config/jwt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Tache = require("../models/Tache");

exports.create = async (req, res, next) => {
    let convertDate = function(strDate) {
        var dateParts = strDate.split("/");
        var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }
    const nom = req.body.nom;
    const responsableId = req.body.responsableId;
    const projetId = mongoose.Types.ObjectId(req.body.projetId);
    const etat = req.body.etat;
    const description = req.body.description;
    const dateDebutPrevisionnelle = convertDate(req.body.dateDebutPrevisionnelle) ;
    const dateFinPrevisionnelle = convertDate(req.body.dateFinPrevisionnelle);
    const chargeAssociee = req.body.chargeAssociee;
    const dateDebutReelle = convertDate(req.body.dateDebutReelle);
    const dateFinReelle = convertDate(req.body.dateFinReelle);
    const chargeConsommee = req.body.chargeConsommee;
    const avancement = req.body.avancement;

    // if responableId not found
    const foundResponsable = await User.findOne({ userId:responsableId }).select("+password");
    if (!foundResponsable) {
        const response = {
            message: "User not found"
        };
        return res.status(500).send(response);
        /*
        const error = new Error("ResponsableID not found");
        error.statusCode = 401;
        throw error;
        */
    }
    // if projectId not found
    console.log("Create Tache");

    let tache = new Tache();
    tache.nom = nom;
    tache.responsableId = responsableId;
    tache.projetId = projetId;
    tache.etat = etat;
    tache.description = description;
    tache.dateDebutPrevisionnelle = dateDebutPrevisionnelle;
    tache.dateFinPrevisionnelle = dateFinPrevisionnelle;
    tache.chargeAssociee = chargeAssociee;
    tache.dateDebutReelle = dateDebutReelle;
    tache.dateFinReelle = dateFinReelle;
    tache.chargeConsommee = chargeConsommee;
    tache.avancement = avancement;
    
    tache = await tache.save();

    return res.send({tache});
};
exports.delete = async (req, res, next) => {
    console.log("Delete Task by id");

    const tacheId = req.body.tacheId;

    var foundId = await Tache.find({ _id:tacheId }); 
    if (foundId.length == 0) {
        const response = {
            message: "tacheId not found"
        };
        return res.status(500).send(response);
    }

    Tache.findByIdAndRemove(tacheId, (err, tache) => {
        // Error if detected :
        if (err) return res.status(500).send(err);

        // if not :
        // if tache found
        const response = {
            message: "Suppression Tache avec succès",
            id: tache._id
        };

        return res.status(200).send(response);
    });
};
exports.update = async (req, res, next) => {
    console.log("Update Task by id");

    const tacheId = req.body.tacheId;
    const modif = req.body.modif;

    var foundId = await Tache.find({ _id:tacheId }); 
    console.log(tacheId);
    if (foundId.length == 0) {
        const response = {
            message: "tacheId not found"
        };
        return res.status(500).send(response);
    }

    Tache.findByIdAndUpdate(tacheId, modif, 
        // Ask mongoose to return the updated version of doc instead of pre-updated one
        {new:true},
        (err, tache) => {
            // If error
            if (err) return res.status(500).send(err);
            return res.send(tache);
        })
};

exports.getAll = async (req, res, next) => {
    const ret = await Tache.find({});
    return res.send(ret);
};
