const router = require("express").Router();

const auth = require("../../auth");
const Validation = require("express-validation");
const { TransportadoraValidation } = require("../../../controllers/validacoes/TransportadoraValidation");

const TransportadoraController = require("../../../controllers/TransportadoraController");
const transportadoraController = new TransportadoraController();

router.get("/", transportadoraController.index);
router.get("/:id", Validation(TransportadoraValidation.show), transportadoraController.show); // testado
router.get("/nome/:nome", Validation(TransportadoraValidation.showByName), transportadoraController.showByName); // testado

router.post("/", auth.required, Validation(TransportadoraValidation.store), transportadoraController.store); // testado
router.put("/:id", auth.required, TransportadoraValidation.admin,
    Validation(TransportadoraValidation.update), transportadoraController.update); // testado
router.delete("/:id", auth.required, TransportadoraValidation.admin, transportadoraController.remove); // testado

module.exports = router;