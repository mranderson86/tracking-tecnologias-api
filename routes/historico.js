const express = require('express');
const router = express.Router();

const Historico = require('../models/historico');

router.get('/', async function index(req, res) {
  const historico = await Historico.find();

  return res.json(historico);
});

router.post('/', async function store(req, res) {
  const {usuario, tecnologia, data} = req.body;

  checkin = await Historico.create({
    usuario,
    tecnologia,
    data
  });

  return res.json(checkin);
});

module.exports = router;