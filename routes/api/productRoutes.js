const express = require('express');
const apiControllers = require('../../controllers/api/productControllers');

const router = express.Router();

router.get('/', apiControllers.getAll);

module.exports = router 