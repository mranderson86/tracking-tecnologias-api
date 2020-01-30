const express = require('express');
const router = express.Router();

// controle de autorização
//const authController = require('../controller/auth');
// Teste de autorização 
//router.use(authController);

// Rota Raiz
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
