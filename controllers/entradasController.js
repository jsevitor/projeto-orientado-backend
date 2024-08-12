const entradasModel = require("../models/entradasModel");

const getAllEntradas = async (req, res) => {
  try {
    const entradas = await entradasModel.getAllEntradas();
    res.status(200).json(entradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntradaById = async (req, res) => {
  const { id } = req.params;
  try {
    const entrada = await entradasModel.getEntradaById(id);
    if (!entrada) {
      return res.status(404).json({ error: "Entrada não encontrada" });
    }
    res.status(200).json(entrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEntrada = async (req, res) => {
  try {
    const newEntrada = await entradasModel.createEntrada(req.body);
    res.status(201).json(newEntrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEntrada = await entradasModel.updateEntrada(id, req.body);
    if (!updatedEntrada) {
      return res.status(404).json({ error: "Entrada não encontrada" });
    }
    res.status(200).json(updatedEntrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    await entradasModel.deleteEntrada(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  createEntrada,
  updateEntrada,
  deleteEntrada,
};
