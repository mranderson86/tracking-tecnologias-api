const express = require('express');
const router = express.Router();

const Tecnologia = require('../models/techs');

router.get('/', async function index(req, res) {
  const tecnologias = await Tecnologia.find();

  return res.json(tecnologias);
});

router.post('/', async function store(req, res) {
  const {techname} = req.body;

  tecnologia = await Tecnologia.create({
    techname
  });

  return res.json(tecnologia);
});

module.exports = router;