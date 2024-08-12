const express = require("express");
const router = express.Router();
const fornecedoresController = require("../controllers/fornecedoresController");

router.get("/", fornecedoresController.getAllFornecedores);
router.get("/:id", fornecedoresController.getFornecedorById);
router.post("/", fornecedoresController.createFornecedor);
router.put("/:id", fornecedoresController.updateFornecedor);
router.delete("/:id", fornecedoresController.deleteFornecedor);

module.exports = router;
