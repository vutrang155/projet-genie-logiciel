const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");

router.post("/create", projetController.create);

router.delete("/delete/:projetId", projetController.delete);
router.put("/update", projetController.update);
router.get("/getAll", projetController.getAll);
router.get("/getById/:projetId", projetController.getById);
router.get("/getByUser/:userId", projetController.getByUser);
router.get("/getByResponsable/:responsableId",projetController.getByResponsable);

module.exports = router;