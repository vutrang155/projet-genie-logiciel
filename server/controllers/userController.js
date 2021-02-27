const jwt =require('jsonwebtoken');
const config = require("../config/jwt");
const User = require("../models/User");


exports.register = async (req, res, next) => {
    console.log("Register");
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ userId: req.body.userId });
        if (existingUser) {
            const error = new Error("Name already used");
            error.statusCode = 403;
            throw error;
        }

        let user = new User();
        user.userId = req.body.userId;
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
        const userId = req.body.userId;
        const password = req.body.password;

        const user = await User.findOne({ userId : userId }).select("+password");
        if (!user) {
                const error = new Error("Wrong UserId");
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

exports.getall = async (req,res,next) =>{
    const ret = await User.find({});
    return res.send(ret);
};

exports.delete = async  (req,res,next ) => {
    console.log("Delete User by id");

    const userId = req.params.userId;

    var foundId = await User.find({ userId:userId });
    if (userId === undefined || foundId.length === 0) {
        const response = {
            message: "UserId not found"
        };
        return res.status(500).send(response);
    }

    User.findByIdAndRemove(foundId, (err, user) => {
        // Error if detected :
        if (err) return res.status(500).send(err);

        // if not :
        // if User found
        const response = {
            message: "Suppression Tache avec succès",
            id: user._id
        };

        return res.status(200).send(response);
    });

}

exports.update = async (req, res, next) => {
    console.log("Update User by id");

    const userId = req.body.userId;
    const modif = req.body.modif;

    var foundId = await User.find({ userId:userId  });
    if (userId === undefined || foundId.length === 0) {
        const response = {
            message: "userId not found"
        };
        return res.status(500).send(response);
    }

    User.findByIdAndUpdate(foundId, modif,
        // Ask mongoose to return the updated version of doc instead of pre-updated one
        {new:true},
        (err, user) => {
            // If error
            if (err) return res.status(500).send(err);
            return res.send(user);
        })
};

exports.getByUserId = async (req, res, next) => {
    console.log("Get User by ID");

    const userId = req.params.userId;
    var foundId = await User.find({ userId:userId });
    if (userId === undefined || foundId.length === 0) {
        const response = {
            message: "userId not found"
        };
        return res.status(500).send(response);
    }

    User.findById(foundId, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(user);
    });
};

exports.getByType = async (req,res,next) =>{
    const ret = await User.find({role:req.params.role});
    return res.send(ret);
};

exports.getById = async (req, res, next) => {
    console.log("Get User by ID");

    const userId = req.params.id;
    var foundId = await User.find({ _id:userId });
    if (userId === undefined || foundId.length === 0) {
        const response = {
            message: "id not found"
        };
        return res.status(500).send(response);
    }

    User.findById(foundId, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(user);
    });
};
