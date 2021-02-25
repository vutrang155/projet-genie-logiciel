
const Tache = require("../models/Tache");
//post
exports.store = async (req, res, next) => {
    try {
        let tache = new Tache();
        tache.nom = req.body.nom;
        tache.description = req.body.description;
        tache = await tache.save();

        res.send(tache);
    } catch (err) {
        next(err);
    }
};
//get
exports.show = async (req, res, next) => {
    try {
        const tache = await tache.findOne({
            _id: req.params.id
        }).populate("user");

        res.send(tache);
    } catch (err) {
        next(err);
    }
};
