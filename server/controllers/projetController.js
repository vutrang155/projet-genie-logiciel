const mongoose = require("mongoose");
const Projet= require("../models/Projet");
const Tache= require("../models/Tache");
const User= require("../models/User");
const Client= require("../models/Client");
const Contact= require("../models/Contact");

exports.create = async (req, res, next) => {
    console.log("Create project");
    try {
        let p = new Projet();
        p.nom = req.body.nom;
        p.responsableId = req.body.responsableId;
        p.clientId = req.body.clientId;
        p.contactId = req.body.contactId;
        p.etat = req.body.etat;
        p.dateDebutPrevisionnelle = req.body.dateDebutPrevisionnelle;
        p.dateFinPrevisionnelle = req.body.dateFinPrevisionnelle;
        p.dateDebutReelle = req.body.dateDebutReelle;
        p.dateFinReelle = req.body.dateFinReelle;
        p = await p.save();

        return res.send({p});

    }catch(err) {
        console.log(err)
        const response = {
            message: "Impossible de créer la projet"
        };
        return res.status(500).send(response);
    }
}

exports.delete = async (req, res, next) => {
    console.log("Delete Project by id");

    const projetId = req.body.projetId;

    var foundId = await Projet.find({ _id:projetId });
    if (projetId === undefined || foundId.length === 0) {
        const response = {
            message: "projetId not found"
        };
        return res.status(500).send(response);
    }

    Projet.findByIdAndRemove(projetId, (err, projet) => {
        // Error if detected :
        if (err) return res.status(500).send(err);

        // if not :
        // if tache found
        const response = {
            message: "Suppression Projet avec succès",
            id: projet._id
        };

        return res.status(200).send(response);
    });
};

exports.update = async (req, res, next) => {
    console.log("Update projet by id");

    const projetId = req.body.projetId;
    const modif = req.body.modif;

    var foundId = await Projet.find({ _id:projetId });
    if (projetId === undefined || foundId.length === 0) {
        const response = {
            message: "projetId not found"
        };
        return res.status(500).send(response);
    }

    Projet.findByIdAndUpdate(projetId, modif,
        // Ask mongoose to return the updated version of doc instead of pre-updated one
        {new:true},
        (err, projet) => {
            // If error
            if (err) return res.status(500).send(err);
            return res.send(projet);
        })
};

exports.getAll = async (req, res, next) => {
    const ret = await Projet.find({});
    return res.send(ret);
};

exports.getById = async (req, res, next) => {
    console.log("Get projet by ID");

    const projetId = req.body.projetId;
    var foundId = await Projet.find({ _id:projetId });
    if (projetId === undefined || foundId.length === 0) {
        const response = {
            message: "projetId not found"
        };
        return res.status(500).send(response);
    }

    Projet.findById(projetId, (err, projet) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(projet);
    });
};
exports.getByUser = async (req, res, next) => {
    console.log("Get Project by User");
    const _userId = req.body.userId;
    var foundId = await User.find({ userId: _userId });
    console.log(_userId);
    if (_userId === undefined || foundId.length === 0) {
        const response = {
            message: "userId not found"
        };
        return res.status(500).send(response);
    }
    console.log("user found");

    Projet.aggregate([
        {
            '$lookup': {
                'from': 'taches',
                'localField': '_id',
                'foreignField': 'projetId',
                'as': 't'
            }
        }, {
            '$unwind': {
                'path': '$t'
            }
        }, {
            '$match': {
                't.responsableId': req.body.userId
            }
        }, {
            '$project': {
                't': 0
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


exports.getByResponsable = async (req,res,next) =>{
    console.log("Get Project by Responsable");
    const responsableId = req.body.responsableId;
    var foundId = await User.find({ userId: responsableId });
    console.log(responsableId);
    if (responsableId === undefined || foundId.length === 0) {
        const response = {
            message: "userId not found"
        };
        return res.status(500).send(response);
    }
    Projet.find({responsableId :responsableId }, (err, projet) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(projet);
    });
}