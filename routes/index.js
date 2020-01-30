const express = require('express');
const router = express.Router();

const routerPrivateUser = require('../routes/usuarios');
const techsRouter = require('../routes/techs');
const checkinRouter = require('../routes/checkin');

// Todas rotas do backend
router.use(routerPrivateUser);
router.use(techsRouter);
router.use(checkinRouter);

// Rota Raiz
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
