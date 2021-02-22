const jwt =require('jsonwebtoken');
const config = require("../config/jwt");
const User = require("../models/user");

exports.register = async (req, res, next) => {
    console.log("Register");
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ name: req.body.name });
        if (existingUser) {
            const error = new Error("Name already used");
            error.statusCode = 403;
            throw error;
        }

        let user = new User();
        user.password = await user.encryptPassword(req.body.password);
        user.name = req.body.name;
        user = await user.save();

        const token = jwt.sign({"name":User.name},config.jwtSecret,{expiresIn : "1h"});
        return res.send({ user, token });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    console.log("login");

    try {
        const name = req.body.name;
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

        const token = jwt.sign({"name":User.name},config.jwtSecret,{expiresIn : "1h"});
        return res.send({ user, token });
    } catch (err) {
        next(err);
    }
};