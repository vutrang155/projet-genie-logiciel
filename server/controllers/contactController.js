const Contact = require("../models/Contact");
const Client = require("../models/Client");

exports.create = async (req, res, next) => {

	console.log('Create contact');
	try {
		console.log(req.body);

		let contact = new Contact();
		contact.nom = req.body.nom;
		contact.prenom = req.body.prenom;
		contact.fonction = req.body.fonction;
		contact.adresse = req.body.adresse;
		let client = req.body.clientId;
		let existe = await Client.findOne({ _id: client }).exec();
		console.log(contact.nom);
		if (existe) {
			contact.clientId = existe;
			contact = await contact.save();
		} else {
			const error = new Error("Client non existant");
			error.statusCode = 400;
			return res.send("Client non existant");
		}

		return res.send({ contact });

	} catch (err) { next(err); }
}
exports.getbyId = async (req, res, next) => {


	console.log("Get Contact by ID");
	try {

		const contactId = req.params.contactId;
		var foundId = await Contact.find({ _id: contactId });
		if (contactId == undefined || foundId.length == 0) {
			const response = {
				message: "contactId not found"
			};
			return res.status(500).send(response);
		}

		Contact.findById(contactId, (err, contact) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send(contact);
		});

	} catch (err) { next(err); }
}
exports.getAll = async (req, res, next) => {

	console.log("getAll");
	try {

		const liste = await Contact.find({});

		return res.send({ liste });
	} catch (err) { next(err); }

}
exports.getbyClient = async (req, res, next) => {
	console.log("Contact getbyClient");
	try {
		let id = req.params.clientId;
		var foundId = await Client.find({ _id: id });
		if (id === undefined || foundId.length === 0) {
			const response = {
				message: "clientId not found"
			};
			return res.status(500).send(response);
		}
		Contact.find({ clientId: id }, (err, contact) => {
			if (err) return res.status(500).send(err)
			return res.status(200).send(contact);
		});
	} catch (err) { next(err); }
}
exports.delete = async (req, res, next) => {

	console.log("Delete Contact by id");
	try {
		const contactId = req.params.contactId;

		var foundId = await Contact.find({ _id: contactId });
		if (contactId === undefined || foundId.length === 0) {
			const response = {
				message: "contactId not found"
			};
			return res.status(500).send(response);
		}

		Contact.findByIdAndRemove(contactId, (err, contact) => {
			// Error if detected :
			if (err) return res.status(500).send(err);

			// if not :
			// if tache found
			const response = {
				message: "Suppression contact avec succès",
				id: contact._id
			};

			return res.status(200).send(response);
		});
	} catch (err) { next(err); }

}
exports.update = async (req, res, next) => {

	console.log('Update Contact');
	try {

		const contactId = req.body.contactId;
		const modif = req.body.modif;
		var foundId = await Contact.find({ _id: contactId });
		console.log(contactId)
		if (contactId === undefined || foundId.length === 0) {
			const response = {
				message: "contactId not found"
			};
			return res.status(500).send(response);
		}
		Contact.findByIdAndUpdate(contactId, modif,
			// Ask mongoose to return the updated version of doc instead of pre-updated one
			{ new: true },
			(err, contact) => {
				// If error
				if (err) return res.status(500).send(err);
				return res.send(contact);
			})
	} catch (err) { next(err); }

}

