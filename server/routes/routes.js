const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

router.post('/task', controller.store);

module.exports = router;
