const mongoose = require("mongoose");
const Projet = require("../models/Projet");
const Tache = require("../models/Tache");
const User = require("../models/User");
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const errCon = require('../controllers/errorController')

//Code pour creer un nouveau projet
exports.create = async (req, res, next) => {
    console.log("Create project");
    try {
        let projet = new Projet();
        projet.nom = req.body.nom;
        //Verifier que l'id envoyé est valide et que responsable existe
        await errCon.checkUser(req.body.responsableId);
        projet.responsableId = req.body.responsableId;
        console.log(req.body.clientId)
        //Verifier que l'id envoyé est valide et que client existe
        await errCon.checkClient(req.body.clientId);
        projet.clientId = req.body.clientId;
        //Verifier que l'id envoyé est valide et que contact existe
        await errCon.checkContact(req.body.contactId);
        projet.contactId = req.body.contactId;
        projet.etat = req.body.etat;
        projet.dateDebutPrevisionnelle = req.body.dateDebutPrevisionnelle;
        projet.dateFinPrevisionnelle = req.body.dateFinPrevisionnelle;
        projet.dateDebutReelle = req.body.dateDebutReelle;
        projet.dateFinReelle = req.body.dateFinReelle;
        projet = await projet.save();
        //On renvoie le projet
        return res.send({ projet });

    } catch (err) {
        //si erreur on utilise l'errorHandler

        console.log(err)
        const response = {
            message: err.message
        };
        return res.status(500).send(response);
    }
}
//Supprimer le projet avc l'id du projet
exports.delete = async (req, res, next) => {
    console.log("Delete Project by id");
    try {
        //verifier que l'id est valide et projet existe
        await errCon.checkProjet(req.params.projetId);
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
    } catch (err) {
        //si erreur on utilise l'errorHandler
        next(err); }
};

//Mettre a jour le projet
exports.update = async (req, res, next) => {
    console.log("Update projet by id");
    try {
        const projetId = req.body.projetId;
        const modif = req.body.modif;
        //verifier que l'id est valide et projet existe

        await errCon.checkProjet(projetId);

        // Check responsableId, clientId, contactId
        if (modif.responsableId)
            await errCon.checkUser(modif.responsableId);
        if (modif.clientId)
            await errCon.checkClient(modif.clientId);
        if (modif.contactId)
            await errCon.checkContact(modif.contactId);

        Projet.findByIdAndUpdate(projetId, modif,
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, projet) => {
                // If error
                if (err) return res.status(500).send(err);

                return res.send(projet);
            })
    } catch (err) {
        //si erreur on utilise l'errorHandler

        next(err); }
};
//Recuperer tous les projet
exports.getAll = async (req, res, next) => {
    try {
        const ret = await Projet.find({}).populate('clientId').populate('contactId').populate('responsableId');

        return res.send(ret);
    } catch (err) { next(err); }
};
//Recuperer un projet par son id
exports.getById = async (req, res, next) => {
    console.log("Get projet by ID");
    try {
        const projetId = req.params.projetId;
        //verifier que l'id est valide et projet existe
        await errCon.checkProjet(projetId);
        Projet.findById(projetId).populate('clientId').populate('contactId').populate('responsableId').exec((err, projet) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(projet);
        });
    } catch (err) { next(err); }
};
//Recuper tous les projets d'un utilisateur
exports.getByUser = async (req, res, next) => {
    console.log("Get Project by User");
    try {
        const _userId = req.params.userId;
        //Verifier que l'utilisateur existe
        await errCon.checkUser(_userId)
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

//Recuperer tous les projet d'un responsable
exports.getByResponsable = async (req, res, next) => {
    console.log("Get Project by Responsable");
    try {
        const responsableId = req.params.responsableId;
        await errCon.checkUser(responsableId)

        Projet.find({ responsableId: responsableId }).populate('clientId').populate('contactId').populate('responsableId').exec((err, projet) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(projet);
        });
    } catch (err) { next(err); }
}