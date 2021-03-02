const mongoose = require("mongoose");
const Projet = require("../models/Projet");
const Tache = require("../models/Tache");
const User = require("../models/User");
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Error = require('../controllers/errorController')

exports.create = async (req, res, next) => {
    console.log("Create project");
    try {
        let projet = new Projet();
        projet.nom = req.body.nom;
        await Error.checkUser(req.body.responsableId);
        projet.responsableId = req.body.responsableId;
        await Error.checkClient(req.body.clientId);
        projet.clientId = req.body.clientId;
        await Error.checkContact(req.body.contactId);
        projet.contactId = req.body.contactId;
        projet.etat = req.body.etat;
        projet.dateDebutPrevisionnelle = req.body.dateDebutPrevisionnelle;
        projet.dateFinPrevisionnelle = req.body.dateFinPrevisionnelle;
        projet.dateDebutReelle = req.body.dateDebutReelle;
        projet.dateFinReelle = req.body.dateFinReelle;
        projet = await projet.save();

        return res.send({ projet });

    } catch (err) {
        console.log(err)
        const response = {
            message: "Impossible de créer la projet"
        };
        return res.status(500).send(response);
    }
}
exports.delete = async (req, res, next) => {
    console.log("Delete Project by id");
    try {
        await Error.checkProjet(req.params.projetId);
        const projetId = req.params.projetId;
        Projet.findByIdAndRemove(projetId, (err, projet) => {
            // Error if detected :
            if (err) throw err;
            // if not :
            // if tache found
            const response = {
                message: "Suppression Projet avec succès",
                id: projet._id
            };

            return res.status(200).send(response);
        });
    } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
    console.log("Update projet by id");
    try {
        const projetId = req.body.projetId;
        const modif = req.body.modif;
        await Error.checkProjet(projetId);

        Projet.findByIdAndUpdate(projetId, modif,
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                // If error
                if (err) return res.status(500).send(err);
                return res.send(projet);
            })
    } catch (err) { next(err); }
};
exports.getAll = async (req, res, next) => {
    try {
        const ret = await Projet.find({}).populate('clientId').populate('contactId').populate('responsableId');

        return res.send(ret);
    } catch (err) { next(err); }
};
exports.getById = async (req, res, next) => {
    console.log("Get projet by ID");
    try {
        const projetId = req.params.projetId;
        await Error.checkProjet(projetId);
        Projet.findById(projetId).populate('clientId').populate('contactId').populate('responsableId').exec((err, projet) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(projet);
        });
    } catch (err) { next(err); }
};
exports.getByUser = async (req, res, next) => {
    console.log("Get Project by User");
    try {
        const _userId = req.params.userId;
        await Error.checkUser(_userId)
        console.log(_userId);

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
                    't.responsableId': mongoose.Types.ObjectId(_userId)
                }
            }, {
                '$project': {
                    't': 0
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'responsableId',
                    'foreignField': '_id',
                    'as': 'responsableId'
                }
            },
            {
                '$lookup': {
                    'from': 'clients',
                    'localField': 'clientId',
                    'foreignField': '_id',
                    'as': 'clientId'
                }

            },
            {
                '$lookup': {
                    'from': 'contacts',
                    'localField': 'contactId',
                    'foreignField': '_id',
                    'as': 'contactId'
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
exports.getByResponsable = async (req, res, next) => {
    console.log("Get Project by Responsable");
    try {
        const responsableId = req.params.responsableId;
        await Error.checkUser(responsableId)

        Projet.find({ responsableId: responsableId }).populate('clientId').populate('contactId').populate('responsableId').exec((err, projet) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(projet);
        });
    } catch (err) { next(err); }
}