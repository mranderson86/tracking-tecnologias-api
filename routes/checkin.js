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

// Consulta todos os check-ins por usuário (devolve todos os usuários)
router.get('/checkin/byuser', checkinController.techByUsers);

// Consulta todos os check-ins por único usuário
router.get('/checkin/byuser/:id', checkinController.techByUser);

// Consulta check-in de todos os usuário no dia
router.get('/checkin/byuser-today', checkinController.techByUserToday);

// Consulta check-in de um único usuário no dia
router.get('/checkin/byuser-today/:id', checkinController.techByUserToday);


module.exports = router;