const jwt =require('jsonwebtoken');
const config = require("../config/jwt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Tache = require("../models/Tache");
const Projet = require("../models/Projet");

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
    }
    const foundProjet = await Projet.findOne({ _id:projetId});
    if (!foundProjet) {
        const response = {
            message: "Projet not found"
        };
        return res.status(500).send(response);
    }
    // if projectId not found
    console.log("Create Tache");

    try {
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
    }
    catch(err) {
        console.log(err)
        const response = {
            message: "Impossible de créer la tache"
        };
        return res.status(500).send(response);
    }

};
exports.delete = async (req, res, next) => {
    console.log("Delete Task by id");

    const tacheId = req.params.tacheId;

    var foundId = await Tache.find({ _id:tacheId }); 
    if (tacheId == undefined || foundId.length == 0) {
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
    console.log(tacheId)
    if (tacheId == undefined || foundId.length == 0) {
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
exports.getById = async (req, res, next) => {
    console.log("Get Task by ID");

    const tacheId = req.params.tacheId;
    var foundId = await Tache.find({ _id:tacheId }); 
    if (tacheId == undefined || foundId.length == 0) {
        const response = {
            message: "tacheId not found"
        };  
        return res.status(500).send(response);
    }

    Tache.findById(tacheId, (err, tache) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(tache);
    });
};
exports.getByUser = async (req, res, next) => {
    console.log("Get Task by User");

    const _userId = req.params.userId;
    var foundId = await User.find({ userId: _userId }); 
    if (_userId == undefined || foundId.length == 0) {
        const response = {
            message: "userId not found"
        };
        return res.status(500).send(response);
    }

    Tache.find({responsableId : _userId}, (err, tache) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(tache);
    });
};
exports.getByProjet = async (req, res, next) => {
    console.log("Get Task by Projet");

    const _projetId = req.params.projetId;
    var foundId = await Projet.find({ _id: _projetId}); 
    if (_projetId == undefined || foundId.length == 0) {
        const response = {
            message: "Projet not found"
        };
        return res.status(500).send(response);
    }

    Tache.find({projetId : _projetId}, (err, tache) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(tache);
    });
};
exports.getByResponsableProjet = async (req, res, next) => {
    console.log("Get Task by Responsable de Projet");

    const responsableId = req.params.responsableId;
    // if responableId not found
    const foundResponsable = await User.findOne({ userId:responsableId }).select("+password");
    if (!foundResponsable) {
        const response = {
            message: "User not found"
        };
        return res.status(500).send(response);
    }

    Tache.aggregate([
        {
            $lookup: {
                from: "projects",
                localField: "projetId",
                foreignField: "_id",
                as: "p"
            }
        },
        {
            $unwind: "$p"
        },
        {
            $match: { "p.responsableId": responsableId }
        },
        {
            $project: {
                "p": 0
            }
        }
    ]).exec((err, taches) => {
        // Error if detected :
        if (err) return res.status(500).send(err);

        // if not :
        // if tache found
        return res.status(200).send(taches);

    });

};