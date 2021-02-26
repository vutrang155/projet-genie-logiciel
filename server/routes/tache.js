const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tacheController");


router.post("/create", tacheController.create);
router.delete("/delete", tacheController.delete);
router.put("/update", tacheController.update);
router.get("/getAll", tacheController.getAll);
router.post("/getById", tacheController.getById);
router.post("/getByUser", tacheController.getByUser);
router.post("/getByProjet", tacheController.getByProjet);
router.post("/getByResponsableProjet", tacheController.getByResponsableProjet);


module.exports = router;
