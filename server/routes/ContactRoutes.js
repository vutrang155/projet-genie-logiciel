const express = require("express");
const router = express.Router();

const ContactController = require("../controllers/ContactController.js"); 


// Création d'un contact
router.post("/create",ContactController.create);

// Suppression d'un contact selon son id
router.delete("/delete",ContactController.delete);

// Mis à jour
router.put("/update",ContactController.update);

// Afficher l'ensemble des contacts
router.get("/getAll",ContactController.getAll);

// Afficher un contact selon son id (contact)
router.get("/getbyId",ContactController.getbyId);

// Afficher un contact selon l'id du Client
router.get("/getbyClient",ContactController.getbyClient);

module.exports = router;