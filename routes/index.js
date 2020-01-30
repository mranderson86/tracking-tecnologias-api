const express = require('express');
const router = express.Router();

const {  routerPrivateUser, routerPublicUser } = require('../routes/usuarios');
const techsRouter = require('../routes/techs');
const checkinRouter = require('../routes/checkin');

// controle de autorização
//const authController = require('../controller/auth');
// Teste de autorização 
//router.use(authController);

router.use(routerPrivateUser);
router.use(routerPublicUser);
router.use(techsRouter);
router.use(checkinRouter);

// Rota Raiz
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
