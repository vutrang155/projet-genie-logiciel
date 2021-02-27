const express = require("express");
const router = express.Router();

const ContactController = require("../controllers/contactController.js");


// Création d'un contact
router.post("/create",ContactController.create);

// Suppression d'un contact selon son id
router.delete("/delete/:contactId",ContactController.delete);

// Mis à jour
router.put("/update",ContactController.update);

// Afficher l'ensemble des contacts
router.get("/getAll",ContactController.getAll);

// Afficher un contact selon son id (contact)
router.get("/getbyId/:contactId",ContactController.getbyId);

// Afficher un contact selon l'id du Client
router.get("/getbyClient/:clientId",ContactController.getbyClient);

module.exports = router;