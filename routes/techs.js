const express = require('express');
const router = express.Router();

const TechController = require('../controller/techs');

// controle de autorização
const authController = require('../controller/auth');

// Rotas privadas
router.use(authController);

// consulta uma única tecnologia
router.get('/techs/:id', TechController.index);

// Rota de Consulta de todas as tecnologias 
router.get('/techs', TechController.all);

// Rota de cadastro de tecnologias
router.post('/techs', TechController.create);

module.exports = router;