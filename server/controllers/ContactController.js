const Contact = require("../models/Contact");


exports.create = async (req,res,next) => {

	console.log('Create');
	console.log(req.body);
	
	let contact = new Contact();
	contact.nom = req.body.nom;
	contact.prenom = req.body.prenom;	
	contact.fonction = req.body.fonction;
	contact.adresse = req.body.adresse;

	let client = req.body.id_client;

	let existe = await Client.findOne({_id:client}).exec();	

	console.log(contact.nom);
	//let existe = await Client.findOne({nom:req.body.nom}).exec();

	if (existe){
		contact.clientId = existe;
		contact = await contact.save();	
	} else {
		const error = new Error("Client non existant");
		error.statusCode = 400;
		return res.send("Client non existant");
	}

	return res.send({contact});  

}


exports.getbyId = async (req,res,next) => {

	console.log('getById');
	
	try {
	let id = req.body.id;

	console.log("ID:");
	console.log(id); 

	let contact = await Contact.findOne({_id:id}).exec();

	if (!contact){ // Si le client n'est pas dans la BDD
		const error = new Error("Client introuvable");
		error.statusCode = 400;
		throw error;
	} 

	return res.send({contact});  }

	catch(err){
		console.log(err);
		return res.send(err);
	} 
}


exports.getAll =  async (req,res,next) => {

	console.log("getAll");

	const liste = await Contact.find({});

	return res.send({liste});

}


exports.getbyClient =  async (req,res,next) => {

	console.log("getbyClient");

	let id = req.body.id;

	console.log("ID:");
	console.log(id); 

	const liste = await Contact.find({clientId:id});

	return res.send({liste});

}





exports.delete = async (req,res,next) => {

	console.log('Delete');
	
	try {
	let id = req.body.id;

	console.log("ID:");
	console.log(id); 

	let contact = await Contact.findOneAndDelete({_id:id}).exec();

	if (!contact){ // Si le contact n'est pas dans la BDD
		const error = new Error("Contact introuvable");
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
/*	let name = req.body.nom;
	let dom = req.body.domaine;
	let adr = req.body.adresse; */

	let nom = req.body.nom;
	let prenom = req.body.prenom;	
	let fonction = req.body.fonction;
	let adresse = req.body.adresse;

	let clientId = req.body.id_client;	


	console.log("ID:");
	console.log(id); 


	let contact = await Contact.findByIdAndUpdate(id,req.body,{ useFindAndModify: false }).exec();

	if (!contact){ // Si le client n'est pas dans la BDD
		const error = new Error("Client introuvable");
		error.statusCode = 400;
		throw error;
	}

	return res.send("Updated");  }

	catch(err){
		console.log(err);
	}

}

