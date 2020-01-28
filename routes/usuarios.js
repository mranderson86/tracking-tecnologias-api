const express = require('express');
const router = express.Router();

const UserController = require('../controller/users');

/* GET users listing. */
router.get('/users', UserController.all );

// rota de autenticação
router.post('/users/authenticate', UserController.authenticate );

// rota de cadastro de um novo usuário
router.post('/users', UserController.create );

// rota de exclusão de um novo usuário
router.delete('/users/:id', UserController.delete );

module.exports = router;
