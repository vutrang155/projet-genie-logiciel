const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tacheController");

//Route pour creer une tâche 
router.post("/create", tacheController.create);
// Route pour supprimer une tâche 
router.delete("/delete/:tacheId", tacheController.delete);
// Route pour mettre à jour une tâche 
router.put("/update", tacheController.update);
// Route pour toutes les tâches
router.get("/getAll", tacheController.getAll);
// Route pour récupérer le tâche par son id 
router.get("/getById/:tacheId", tacheController.getById);
// Route pour récupérer le tâche par le nomUtilisateur de son responsable 
router.get("/getByUser/:userId", tacheController.getByUser);
// Route pour récupérer le tâche par son responsable 
router.get("/getByUserId/:userId", tacheController.getByUserId);
// Route pour récupérer le tâche par son projet 
router.get("/getByProjet/:projetId", tacheController.getByProjet);
// Route pour récupérer le tâche par son responsableId 
router.get("/getByResponsableProjet/:responsableId", tacheController.getByResponsableProjet);
module.exports = router;
