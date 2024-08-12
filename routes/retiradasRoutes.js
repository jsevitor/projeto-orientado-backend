const express = require("express");
const router = express.Router();
const retiradasController = require("../controllers/retiradasController");

router.get("/", retiradasController.getAllRetiradas);
router.get("/:id", retiradasController.getRetiradaById);
router.post("/", retiradasController.createRetirada);
router.put("/:id", retiradasController.updateRetirada);
router.delete("/:id", retiradasController.deleteRetirada);

module.exports = router;
