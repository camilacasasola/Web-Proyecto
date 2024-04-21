// controllers/bebidacreate.js

const BebidaCreate = require('../models/bebidacreate');

exports.addBebida = async (req, res) => {
  try {
    const newBebida = new BebidaCreate(req.body);
    await newBebida.save();
    res.status(201).json(newBebida);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBebidas = async (req, res) => {
    try {
        const bebidas = await BebidaCreate.find();
        res.json(bebidas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las bebidas: " + error.message });
    }
};

