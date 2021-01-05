const router = require("express").Router();

const auth = require("../../auth");
const Validation = require("express-validation");
const { DigitalizacaoValidation } = require("../../../controllers/validacoes/DigitalizacaoValidation");

const DigitalizacaoController = require("../../../controllers/DigitalizacaoController");
const digitalizacaoController = new DigitalizacaoController();

router.get("/", digitalizacaoController.index);
router.get("/:id", Validation(DigitalizacaoValidation.show), digitalizacaoController.show); // testado

router.get("/transportadora/:nome", Validation(DigitalizacaoValidation.showByName), digitalizacaoController.showTransportadora); // testado

router.post("/", auth.required, Validation(DigitalizacaoValidation.store), digitalizacaoController.store); // testado
router.put("/:id", auth.required, DigitalizacaoValidation.admin,
    Validation(DigitalizacaoValidation.update), digitalizacaoController.update); // testado
router.delete("/:id", auth.required, DigitalizacaoValidation.admin, digitalizacaoController.remove); // testado

module.exports = router;