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
    // TODO 
    const projetId = mongoose.Types.ObjectId(req.body.projetId);
    //const projetId = req.body.projetId;
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
        const error = new Error("ResponsableID not found");
        error.statusCode = 401;
        throw error;
    }
    // if projectId not found
    // TODO : error if projectId not found
    console.log("Create Tache");
    console.log(req.body);

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

exports.getAll = async (req, res, next) => {
    console.log("getAll");

    const ret = await Tache.find({});
    console.log(ret);
    return res.send({ret});
};

exports.login = async (req, res, next) => {
    console.log("login");

    try {
        const name = req.body.userId;
        const password = req.body.password;

        const user = await User.findOne({ name }).select("+password");
        if (!user) {
            const error = new Error("Wrong Name");
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            const error = new Error("Wrong Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({"name":User.userId},config.jwtSecret,{expiresIn : "1h"});
        return res.send({ user, token });
    } catch (err) {
        next(err);
    }
};

exports.task = async (req, res, next) => {
    console.log("task");

    try {
        const userId = req.body.userId;

        const user = await User.findOne({ userId });
        if (!user) {
            const error = new Error("Le joueur n'existe pas");
            error.statusCode = 401;
            throw error;
        }
        return res.send({ user });
    } catch (err) {
        next(err);
    }
};