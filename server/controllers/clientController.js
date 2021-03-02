const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Error = require('../controllers/errorController')

exports.create = async (req, res, next) => {
	console.log('Create');
	try {
		console.log(req.body);
		let client = new Client();
		client.nom = req.body.nom;
		client.domaine = req.body.domaine;
		client.adresse = req.body.adresse;
		let existe = await Client.findOne({ nom: req.body.nom }).exec();
		if (existe) {
			const error = new Error("Client existe déja")
			error.statusCode = 400;
			throw error;
		}
		client = await client.save();
		return res.send({ client });
	} catch (err) { next(err); }
}
exports.getbyId = async (req, res, next) => {

	console.log('Get Client by ID');
	try {
		let id = req.params.id;
		await Error.checkClient(id);
		Client.findById(id, (err, client) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send(client);
		});
	} catch (err) { next(err); }
}
exports.getAll = async (req, res, next) => {

	console.log("Client get All");
	try {
		const ret = await Client.find({});
		return res.send(ret);

	} catch (err) { next(err); }
}
exports.delete = async (req, res, next) => {
	console.log("Delete Client by id");
	try {
		const clientId = req.params.clientId;
		await Error.checkClient(clientId);
		/*
		var foundId = await Client.find({ _id: clientId });
		if (clientId === undefined || foundId.length === 0) {
			const response = {
				message: "clientId not found"
			};
			return res.status(500).send(response);
		}
		*/
		Client.findByIdAndRemove(clientId, (err, client) => {
			// Error if detected :
			if (err) return res.status(500).send(err);

			// if not :
			// if tache found
			const response = {
				message: "Suppression client avec succès",
				id: client._id
			};
			return res.status(200).send(response);
		});
	} catch (err) { next(err); }
};
exports.update = async (req, res, next) => {

	console.log("Update projet by id");
	try {
		const clientId = req.body.clientId;
		const modif = req.body.modif;

		await Error.checkClient(clientId);

		Client.findByIdAndUpdate(clientId, modif,
			// Ask mongoose to return the updated version of doc instead of pre-updated one
			{ new: true },
			(err, client) => {
				// If error
				if (err) return res.status(500).send(err);
				return res.send(client);
			})

	} catch (err) { next(err); }
}



