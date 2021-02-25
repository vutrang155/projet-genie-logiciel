const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tacheController");


router.post("/create", tacheController.create);
router.delete("/delete", tacheController.delete);
router.post("/update", tacheController.update);
router.post("/getAll", tacheController.getAll);


module.exports = router;
