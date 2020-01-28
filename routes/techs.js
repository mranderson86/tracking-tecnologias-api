const express = require('express');
const router = express.Router();

const TechController = require('../controller/techs');

router.get('/techs/:id', TechController.index);

router.get('/techs', TechController.all);

router.post('/techs', TechController.create);

module.exports = router;