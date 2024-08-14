const express = require("express");
const router = express.Router();
const movimentacoesController = require("../controllers/movimentacoesController");

router.get("/", movimentacoesController.getAllMovimentacoes);

module.exports = router;
