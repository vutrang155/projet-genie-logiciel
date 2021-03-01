const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/login", userController.login);
router.post("/new",  userController.register);
router.get("/getAll",userController.getall);
router.delete("/delete/:userId", userController.delete);
router.put("/update", userController.update);
router.get("/getByNomUtilisateur/:nomUtilisateur", userController.getByNomUtilisateur);
router.get("/getById/:id", userController.getById);
router.get("/getByType/:role", userController.getByType);
module.exports = router;
