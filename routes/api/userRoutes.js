const express = require('express');
const apiControllers = require('../../controllers/api/userControllers');

const router = express.Router();

router.get('/', apiControllers.getAll);

module.exports = router 