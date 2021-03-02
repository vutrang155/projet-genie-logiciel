const jwt = require('jsonwebtoken');
const config = require("../config/jwt");
const User = require("../models/User");
const Error = require('../controllers/errorController')

exports.register = async (req, res, next) => {
    console.log("Register");
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ nomUtilisateur: req.body.nomUtilisateur });
        if (existingUser) {
            const error = new Error("Name already used");
            error.statusCode = 403;
            throw error;
        }
        let user = new User();
        user.nomUtilisateur = req.body.nomUtilisateur;
        user.password = await user.encryptPassword(req.body.password);
        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.adresse = req.body.adresse;
        user.numeroDeTelephone = req.body.numeroDeTelephone;
        user.adresseMail = req.body.adresseMail;
        user.dateEntree = req.body.dateEntree;
        user.dateSortie = req.body.dateSortie;
        user.compteActive = req.body.compteActive;
        user.role = req.body.role;

        user = await user.save();

        return res.send(user);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    console.log("login");

    try {
        const nomUtilisateur = req.body.nomUtilisateur;
        const password = req.body.password;

        await Error.checkUserByNomUtilisateur(nomUtilisateur);
        const user = await User.findOne({ nomUtilisateur: nomUtilisateur }).select("+password");


        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            const error = new Error("Wrong Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ "name": User.nomUtilisateur }, config.jwtSecret, { expiresIn: "1h" });
        return res.send({ user, token });
    } catch (err) {
        next(err);
    }
};

exports.getall = async (req, res, next) => {
    console.log("Get All User");
    try {
        const ret = await User.find({});
        return res.send(ret);
    } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
    console.log("Delete User by id");

    try {
        const userId = req.params.userId;
        await Error.checkUser(userId);
        var foundId = await User.find({ _id: userId });
        User.findByIdAndRemove(foundId, (err, user) => {
            // Error if detected :
            if (err) return res.status(500).send(err);

            // if not :
            // if User found
            const response = {
                message: "Suppression User avec succès",
                id: user._id
            };

            return res.status(200).send(response);
        });
    } catch (err)
        { next(err); }
}

exports.update = async (req, res, next) => {
    try {
        console.log("Update User by id");
        const userId = req.body.userId;
        const modif = req.body.modif;
        await Error.checkUser(req.body.userId)
        User.findByIdAndUpdate(userId, modif,
            // Ask mongoose to return the updated version of doc instead of pre-updated one
            { new: true },
            (err, user) => {
                // If error
                if (err) throw err;
                return res.send(user);
            })
    } catch (err) {
        next(err)
    }
};

exports.getByNomUtilisateur = async (req, res, next) => {
    console.log("Get User by ID");
    const nomUtilisateur = req.params.nomUtilisateur;
    console.log(nomUtilisateur)
    await Error.checkUserByNomUtilisateur(nomUtilisateur);
    var foundId = await User.find({ nomUtilisateur: nomUtilisateur });
    console.log(foundId)
    User.findById(foundId, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(user);
    });
};

exports.getByType = async (req, res, next) => {
    const ret = await User.find({ role: req.params.role });
    return res.send(ret);
};

exports.getById = async (req, res, next) => {
    console.log("Get User by ID");
    try {
        const userId = req.params.id;
        await Error.checkUser(userId);
        var foundId = await User.find({ _id: userId });
        User.findById(foundId, (err, user) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(user);
        });

    } catch (err) { next(err); }
};
