const retiradasModel = require("../models/retiradasModel");

const getAllRetiradas = async (req, res) => {
  try {
    const retiradas = await retiradasModel.getAllRetiradas();
    res.status(200).json(retiradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRetiradaById = async (req, res) => {
  const { id } = req.params;
  try {
    const retirada = await retiradasModel.getRetiradaById(id);
    if (!retirada) {
      return res.status(404).json({ error: "Retirada não encontrada" });
    }
    res.status(200).json(retirada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRetirada = async (req, res) => {
  try {
    const newRetirada = await retiradasModel.createRetirada(req.body);
    res.status(201).json(newRetirada);
  } catch (error) {
    if (error.message.includes("Estoque insuficiente")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateRetirada = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRetirada = await retiradasModel.updateRetirada(id, req.body);
    if (!updatedRetirada) {
      return res.status(404).json({ error: "Retirada não encontrada" });
    }
    res.status(200).json(updatedRetirada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRetirada = async (req, res) => {
  const { id } = req.params;
  try {
    await retiradasModel.deleteRetirada(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRetiradas,
  getRetiradaById,
  createRetirada,
  updateRetirada,
  deleteRetirada,
};
