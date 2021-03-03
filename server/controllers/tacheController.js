const jwt = require('jsonwebtoken');
const config = require("../config/jwt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Tache = require("../models/Tache");
const Projet = require("../models/Projet");
const errCon = require('../controllers/errorController')

var updateProjetDate = (pId) => {
    // $ne to check null value
    console.log("Here"+pId);
    Tache.find({projetId:pId, dateDebutReelle: { $ne: null } }).sort({ dateDebutReelle: 0 }).limit(1).exec((err, taches) => {
        // if all null : do nothing
        if (taches.length != 0) {
            Projet.findByIdAndUpdate(pId, {dateDebutReelle : taches[0].dateDebutReelle},
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                console.log(projet);
            });
        }
    });

    Tache.find({projetId:pId, dateFinReelle: { $ne: null } }).sort({ dateFinReelle: -1 }).limit(1).exec((err, taches) => {
        // if all null : do nothing
        if (taches.length != 0) {
            Projet.findByIdAndUpdate(pId, {dateFinReelle : taches[0].dateFinReelle},
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                console.log(projet);
            });
        }
    });
    Tache.find({projetId:pId, dateDebutPrevisionnelle: { $ne: null } }).sort({ dateDebutPrevisionnelle: 0 }).limit(1).exec((err, taches) => {
        // if all null : do nothing
        if (taches.length != 0) {
            Projet.findByIdAndUpdate(pId, {dateDebutPrevisionnelle : taches[0].dateDebutPrevisionnelle},
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                console.log(projet);
            });
        }
    });

    Tache.find({projetId:pId, dateFinPrevisionnelle: { $ne: null } }).sort({ dateFinPrevisionnelle: -1 }).limit(1).exec((err, taches) => {
        // if all null : do nothing
        if (taches.length != 0) {
            Projet.findByIdAndUpdate(pId, {dateFinPrevisionnelle : taches[0].dateFinPrevisionnelle},
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                console.log(projet);
            });
        }
    });
};
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
        await errCon.checkUser(responsableId);
        await errCon.checkProjet(projetId);

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
            tache.predecesseur=req.body.predecesseur;
            tache = await tache.save();

            // UPDATE PROJECT DATE :
            updateProjetDate(projetId)

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

        await errCon.checkTache(tacheId);

        Tache.findByIdAndRemove(tacheId, (err, tache) => {
            // Error if detected :
            if (err) return res.status(500).send(err);

            // if not :
            // if tache found
            const response = {
                message: "Suppression Tache avec succès",
                id: tache._id
            };

            // UPDATE PROJECT DATE :
            updateProjetDate(tache.projetId);

            return res.status(200).send(response);
        });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    console.log("Update Task by id");
    try {

        const tacheId = req.body.tacheId;
        const modif = req.body.modif;

        await errCon.checkTache(tacheId);

        // Check if responsableId found
        if (modif.responsableId) 
            await errCon.checkUser(modif.responsableId);
        if (modif.projetId)
            await errCon.checkProjet(modif.projetId);

        Tache.findByIdAndUpdate(tacheId, modif,
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, tache) => {
                // If error
                if (err) return res.status(500).send(err);

                // UPDATE PROJECT DATE :
                updateProjetDate(tache.projetId)


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
        await errCon.checkTache(tacheId);

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
        await errCon.checkUser(_userId);
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
        await errCon.checkProjet(_projetId)

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
        await errCon.checkUser(responsableId);
        console.log(responsableId)
        Tache.aggregate([
            {
                '$lookup': {
                    'from': "projets",
                    'localField': "projetId",
                    'foreignField': "_id",
                    'as': "p"
                }
            },
            {
                '$unwind': "$p"
            },
            {
                '$match': { "p.responsableId": mongoose.Types.ObjectId(responsableId) }
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
            console.log(taches)
            if (err) return res.status(500).send(err);

            // if not :
            // if tache found
            return res.status(200).send(taches);

        });

    } catch (err) { next(err); }
};