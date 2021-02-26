const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tacheController");


router.post("/create", tacheController.create);
router.delete("/delete/:tacheId", tacheController.delete);
router.put("/update", tacheController.update);
router.get("/getAll", tacheController.getAll);
router.get("/getById/:tacheId", tacheController.getById);
router.get("/getByUser/:userId", tacheController.getByUser);
router.get("/getByProjet/:projetId", tacheController.getByProjet);
router.get("/getByResponsableProjet/:responsableId", tacheController.getByResponsableProjet);
module.exports = router;
