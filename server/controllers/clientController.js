
const Client = require("../models/Client");

const Contact = require("../models/Contact");
exports.create = async (req,res,next) => {
	console.log('Create');
	console.log(req.body);
	try{
		let client = new Client();
		client.nom = req.body.nom;
		client.domaine = req.body.domaine;
		client.adresse = req.body.adresse;
		console.log(client.nom);
		let existe = await Client.findOne({nom:req.body.nom}).exec();
		client = await client.save();
		if (!existe){}
		else{
			const error = new Error("Client déjà existant");
			error.statusCode = 400;
			throw error;
		}
		return res.send({client});
	}
	catch (err){
		console.log(err);
		const response = {
			message: "Client déjà existant"
		};
		return res.status(500).send(response);
	}
}
exports.getbyId = async (req,res,next) => {

	console.log('Get Client by ID');
	let id = req.params.id;

	console.log("ID:");
	console.log(id);

	let clientId = await Client.findOne({_id: id}).exec();
	var foundId = await Client.find({_id: clientId});
	if (clientId === undefined || foundId.length === 0) {
		const response = {
			message: "clientId not found"
		};
		return res.status(500).send(response);
	}

	Client.findById(clientId, (err, client) => {
		if (err) return res.status(500).send(err);
		return res.status(200).send(client);
	});
}
exports.getAll =  async (req,res,next) => {
	console.log("Client get All");
	const ret = await Client.find({});
	return res.send(ret);
}
exports.delete = async (req,res,next) => {
	console.log("Delete Client by id");
	const clientId = req.params.clientId;
	var foundId = await Client.find({ _id:clientId });
	if (clientId === undefined || foundId.length === 0) {
		const response = {
			message: "clientId not found"
		};
		return res.status(500).send(response);
	}
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
};
exports.update = async (req,res,next) => {

	console.log("Update projet by id");

	const clientId = req.body.clientId;
	const modif = req.body.modif;

	var foundId = await Client.find({ _id:clientId });
	if (clientId === undefined || foundId.length === 0) {
		const response = {
			message: "clientId not found"
		};
		return res.status(500).send(response);
	}

	Client.findByIdAndUpdate(clientId, modif,
		// Ask mongoose to return the updated version of doc instead of pre-updated one
		{new:true},
		(err, client) => {
			// If error
			if (err) return res.status(500).send(err);
			return res.send(client);
		})

}



