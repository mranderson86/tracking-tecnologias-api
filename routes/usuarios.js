const express = require('express');
const router = express.Router();

const Usuario = require('../models/users');

/* GET users listing. */
router.get('/', async function index(req, res) {
  const usuarios = await Usuario.find();

  return res.json(usuarios);
});

router.post('/', async function store(req, res) {
  const { nome, sobrenome, senha, email, avatarURL } = req.body;

  usuario = await Usuario.create({
    nome,
    sobrenome,
    email,
    senha,
    avatarURL
  });

  return res.json(usuario);
});

module.exports = router;
