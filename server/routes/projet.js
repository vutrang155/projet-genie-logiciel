const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");

//Route pour creer un projet
router.post("/create", projetController.create);
//Route pour supprimer un projet via son id
router.delete("/delete/:projetId", projetController.delete);
//Route pour mettre a jour un projet
router.put("/update", projetController.update);
//Route pour recuperer tous les projets
router.get("/getAll", projetController.getAll);
//Route pour recuperer un projet via son id
router.get("/getById/:projetId", projetController.getById);
//Route pour recuperer des projet d'un utilisateur utilisant des userid
router.get("/getByUser/:userId", projetController.getByUser);
//Route pour recuperer des projet d'un utilisateur utilisant des userid
router.get("/getByResponsable/:responsableId",projetController.getByResponsable);

module.exports = router;