const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/login", userController.login);
router.post("/new",  userController.register);
router.get("/getAll",userController.getall);
router.delete("/delete", userController.delete);
router.put("/update", userController.update);
router.post("/getById", userController.getById);
router.post("/getByType", userController.getByType);


module.exports = router;
