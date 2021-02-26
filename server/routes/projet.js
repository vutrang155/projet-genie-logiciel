const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");

router.post("/create", projetController.create);

router.delete("/delete", projetController.delete);
router.put("/update", projetController.update);
router.get("/getAll", projetController.getAll);
router.post("/getById", projetController.getById);
router.post("/getByUser", projetController.getByUser);
router.post("/getByResponsable",projetController.getByResponsable);

module.exports = router;