const jwt = require('jsonwebtoken');
const config = require("../config/jwt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Tache = require("../models/Tache");
const Projet = require("../models/Projet");

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
        // if responableId not found
        //const foundResponsable = await User.findOne({ userId:responsableId }).select("+password");
        const foundResponsable = await User.findOne({ _id: responsableId }).select("+password");
        if (!foundResponsable) {
            const response = {
                message: "User not found"
            };
            return res.status(500).send(response);
        }
        const foundProjet = await Projet.findOne({ _id: projetId });
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
            return res.send({ tache });
        }
        catch (err) {
            console.log(err)
            const response = {
                message: "Impossible de créer la tache"
            };
            return res.status(500).send(response);
        }
    } catch (err) { next(err); }

};
exports.delete = async (req, res, next) => {
    console.log("Delete Task by id");

    try {
        const tacheId = req.params.tacheId;

        var foundId = await Tache.find({ _id: tacheId });
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
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    console.log("Update Task by id");
    try {

        const tacheId = req.body.tacheId;
        const modif = req.body.modif;

        var foundId = await Tache.find({ _id: tacheId });
        console.log(tacheId)
        if (tacheId == undefined || foundId.length == 0) {
            const response = {
                message: "tacheId not found"
            };
            return res.status(500).send(response);
        }

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
        var foundId = await Tache.find({ _id: tacheId });
        if (tacheId == undefined || foundId.length == 0) {
            const response = {
                message: "tacheId not found"
            };
            return res.status(500).send(response);
        }

        Tache.findById(tacheId).populate('responsableId').populate('projetId').exec((err, tache) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(tache);
        });
    } catch (err) { next(err); }
};
exports.getByUserId = async (req, res, next) => {
    console.log("Get Task by User");
    try {
        const _userId = req.params.userId;
        var user_; // _id of user
        var foundId = await User.find({ userId: _userId }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            else user_ = user[0]._id;
            console.log(user[0]._id);
        });
        if (_userId == undefined || foundId.length == 0) {
            const response = {
                message: "userId not found"
            };
            return res.status(500).send(response);
        }
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
        var foundId = await User.find({ _id: _userId });
        if (_userId == undefined || foundId.length == 0) {
            const response = {
                message: "userId not found"
            };
            return res.status(500).send(response);
        }
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
        var foundId = await Projet.find({ _id: _projetId });
        if (_projetId == undefined || foundId.length == 0) {
            const response = {
                message: "Projet not found"
            };
            return res.status(500).send(response);
        }
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
        // if responableId not found
        const foundResponsable = await User.findOne({ _id: responsableId }).select("+password");
        if (!foundResponsable) {
            const response = {
                message: "User not found"
            };
            return res.status(500).send(response);
        }

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