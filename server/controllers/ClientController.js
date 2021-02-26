
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

	return res.send({client});  }

	catch (err){
		console.log(err);
		return res.send("Client déjà existant");
	}

}
exports.getbyId = async (req,res,next) => {

	console.log('getById');
	
	try {
	let id = req.body.id;

	console.log("ID:");
	console.log(id); 

	let client = await Client.findOne({_id:id}).exec();

	if (!client){ // Si le client n'est pas dans la BDD
		const error = new Error("Client introuvable");
		error.statusCode = 400;
		throw error;
	} 

	return res.send({client});  }

	catch(err){
		console.log(err);
		return res.send(err);
	} 
}
exports.getAll =  async (req,res,next) => {

	console.log("getAll");

	const liste = await Client.find({});

	return res.send({liste});

}
exports.delete = async (req,res,next) => {

	console.log('Delete');
	
	try {
	let id = req.body.id;

	console.log("ID:");
	console.log(id); 

	let client = await Client.findOneAndDelete({_id:id}).exec();

	let contact = await Contact.deleteMany({clientId:id}).exec();


	if (!client){ // Si le client n'est pas dans la BDD
		const error = new Error("Client introuvable");
		error.statusCode = 400;
		throw error;
	} 

	return res.send("Deleted");  }

	catch(err){
		console.log(err);
		return res.send(err);
	} 

}
exports.update = async (req,res,next) => {

	console.log('Update');
	
	try {
	let id = req.body.id;
	let name = req.body.nom;
	let dom = req.body.domaine;
	let adr = req.body.adresse;


	console.log("ID:");
	console.log(id); 


	let client = await Client.findByIdAndUpdate(id,req.body,{ useFindAndModify: false }).exec();

	if (!client){ // Si le client n'est pas dans la BDD
		const error = new Error("Client introuvable");
		error.statusCode = 400;
		throw error;
	}

	return res.send("Updated");  }

	catch(err){
		console.log(err);
	}

}



