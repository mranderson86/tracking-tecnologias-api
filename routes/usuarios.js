const express = require('express');

const routerPrivateUser = express.Router();

const UserController = require('../controller/users');

// controle de autorização
const authController = require('../controller/auth');

// Rotas privadas
routerPrivateUser.use(authController);

// Rotas públicas
// rota de autenticação
routerPrivateUser.post('/users/login', UserController.authenticate );

// rota de cadastro de um novo usuário
routerPrivateUser.post('/users/register', UserController.create );

// rota de consula de único usuário
routerPrivateUser.get('/users/:id', UserController.index);

// rota de consulta de usuários
routerPrivateUser.get('/users', UserController.all );

// rota de exclusão de um novo usuário
routerPrivateUser.delete('/users/:id', UserController.delete );

module.exports = routerPrivateUser ;
