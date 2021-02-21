const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

router.get('/task', controller.test);

module.exports = router;
