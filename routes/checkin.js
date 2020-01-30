const express = require('express');

const router = express.Router();

const checkinController = require('../controller/checkin');

// controle de autorização
const authController = require('../controller/auth');

// Rotas privadas
router.use(authController);

// Rota de cadastro de check-ins
router.post('/checkin/register', checkinController.create);

// Consulta todos os check-ins cadastrados
router.get('/checkin', checkinController.all);

// Consulta todos os check-ins por tecnologia
router.get('/checkin/bytech', checkinController.usersByTech);

// Consulta todos os check-ins por usuário
router.get('/checkin/byuser', checkinController.techByUsers);


module.exports = router;