
const task = require("../models/Task");
//post
exports.store = async (req, res, next) => {
    try {
        let task = new task();
        task.name = req.body.name;
        task.description = req.body.description;
        task = await task.save();

        res.send(task);
    } catch (err) {
        next(err);
    }
};
//get
exports.show = async (req, res, next) => {
    try {
        const task = await task.findOne({
            _id: req.params.id
        }).populate("user");

        res.send(task);
    } catch (err) {
        next(err);
    }
};
