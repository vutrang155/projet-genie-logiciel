const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/ClientController.js"); 


// Création d'un client
router.post("/create",ClientController.create);

// Suppression d'un client selon son id
router.delete("/delete",ClientController.delete);

// Mis à jour
router.put("/update",ClientController.update);

// Afficher l'ensemble des clients
router.get("/getAll",ClientController.getAll);

// Afficher un client selon son id 
router.get("/getbyId",ClientController.getbyId);


module.exports = router;