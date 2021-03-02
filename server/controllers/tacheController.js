const jwt = require('jsonwebtoken');
const config = require("../config/jwt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Tache = require("../models/Tache");
const Projet = require("../models/Projet");
const Error = require('../controllers/errorController')

exports.create = async (req, res, next) => {
    /**let convertDate = function(strDate) {
        var dateParts = strDate.split("/");
        var date = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }**/
    try {
        const nom = req.body.nom;
        const responsableId = req.body.responsableId;
        const projetId = req.body.projetId;
        const etat = req.body.etat;
        const description = req.body.description;
        const dateDebutPrevisionnelle = req.body.dateDebutPrevisionnelle;
        const dateFinPrevisionnelle = req.body.dateFinPrevisionnelle;
        const chargeAssociee = req.body.chargeAssociee;
        const dateDebutReelle = req.body.dateDebutReelle;
        const dateFinReelle = req.body.dateFinReelle;
        const chargeConsommee = req.body.chargeConsommee;
        const avancement = req.body.avancement;

        await Error.checkUser(responsableId);
        await Error.checkProjet(projetId);

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
            return res.send({ tache });
        }
        catch (err) {
            console.log(err)
            const response = {
                message: err.message
            };
            return res.status(500).send(response);
        }
    } catch (err) { next(err); }

};
exports.delete = async (req, res, next) => {
    console.log("Delete Task by id");

    try {
        const tacheId = req.params.tacheId;

        await Error.checkTache(tacheId);

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
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    console.log("Update Task by id");
    try {

        const tacheId = req.body.tacheId;
        const modif = req.body.modif;

        await Error.checkTache(tacheId);

        // Check if responsableId found
        if (modif.responsableId) 
            await Error.checkUser(modif.responsableId);
        if (modif.projetId)
            await Error.checkProjet(modif.projetId);

        Tache.findByIdAndUpdate(tacheId, modif,
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, tache) => {
                // If error
                if (err) return res.status(500).send(err);
                return res.send(tache);
            })
    } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
    try {
        const ret = await Tache.find({}).populate('responsableId').populate('projetId');
        return res.send(ret);
    } catch (err) { next(err); }
};
exports.getById = async (req, res, next) => {
    console.log("Get Task by ID");
    try {
        const tacheId = req.params.tacheId;
        await Error.checkTache(tacheId);

        Tache.findById(tacheId).populate('responsableId').populate('projetId').exec((err, tache) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(tache);
        });
    } catch (err) { next(err); }
};
exports.getByUserId = async (req, res, next) => {
    console.log("Get Task by User");
    try {
        Error.checkUserByNomUtilisateur(req.params.nomUtilisateur);
        var user_; // _id of user
        var foundId = await User.find({ userId: _userId }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            else user_ = user[0]._id;
            console.log(user[0]._id);
        });
        Tache.find({ responsableId: user_ }).populate('responsableId').populate('projetId').exec((err, tache) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(tache);
        });
    } catch (err) { next(err); }
};

exports.getByUser = async (req, res, next) => {
    console.log("Get Task by User");

    try {
        const _userId = req.params.userId;
        await Error.checkUser(_userId);
        Tache.find({ responsableId: _userId }).populate('responsableId').populate('projetId').exec((err, tache) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(tache);
        });
    } catch (err) { next(err); }
};

exports.getByProjet = async (req, res, next) => {
    try {
        console.log("Get Task by Projet");
        const _projetId = req.params.projetId;
        await Error.checkProjet(_projetId)
        Tache.find({ projetId: _projetId }).populate('responsableId').populate('projetId').exec((err, tache) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(tache);
        });
    } catch (err) { next(err); }
};

exports.getByResponsableProjet = async (req, res, next) => {
    console.log("Get Task by Responsable de Projet");
    try {
        const responsableId = req.params.responsableId;
        await Error.checkUser(responsableId);

        Tache.aggregate([
            {
                '$lookup': {
                    'from': "projects",
                    'localField': "projetId",
                    'foreignField': "_id",
                    'as': "p"
                }
            },
            {
                '$unwind': "$p"
            },
            {
                '$match': { "p.responsableId": responsableId }
            },
            {
                '$project': {
                    "p": 0
                }
            },
            {
                '$lookup': {
                    'from': "users",
                    'localField': "responsableId",
                    'foreignField': "_id",
                    'as': "responsableId"
                }
            },
            {
                '$lookup': {
                    'from': "projets",
                    'localField': "projetId",
                    'foreignField': "_id",
                    'as': "projetId"
                }
            }
        ]).exec((err, taches) => {
            // Error if detected :
            if (err) return res.status(500).send(err);

            // if not :
            // if tache found
            return res.status(200).send(taches);

        });

    } catch (err) { next(err); }
};