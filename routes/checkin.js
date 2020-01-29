const express = require('express');

const router = express.Router();

const checkinController = require('../controller/checkin');

// Rota de cadastro de check-ins
router.post('/checkin', checkinController.create);

router.get('/checkin', checkinController.all);

module.exports = router;