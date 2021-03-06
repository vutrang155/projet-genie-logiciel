const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Route pour les utilisateur se connecte
router.post("/login", userController.login);
//Route pour que les utilisateur s'enregistre
router.post("/new",  userController.register);
//Route pour recuperer tous les utilisateurs
router.get("/getAll",userController.getall);
//Route pour supprimer un utilisateur avec un id
router.delete("/delete/:userId", userController.delete);
//Route pour mettre a jour un utilisateur
router.put("/update", userController.update);
//Route pour recuperer un utilisateur via son nom utilisateur
router.get("/getByNomUtilisateur/:nomUtilisateur", userController.getByNomUtilisateur);
//Route pour recuperer un utilisateur via son id
router.get("/getById/:id", userController.getById);
//Route pour recuperer des utilisateur via son type
router.get("/getByType/:role", userController.getByType);
module.exports = router;
