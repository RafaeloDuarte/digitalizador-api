const router = require('express').Router()
const auth = require("../../auth")
const UsuarioController = require("../../../controllers/UsuarioController")

const Validation = require("express-validation");
const UsuarioVaidator = require("../../../controllers/validacoes/UsuarioValidation")
const usuarioController = new UsuarioController();

router.get("/", auth.required,usuarioController.index) 
router.get("/:id",Validation(UsuarioVaidator.show),auth.required,usuarioController.show)

router.post("/login", Validation(UsuarioVaidator.login), usuarioController.login)  
router.post("/register", Validation(UsuarioVaidator.store),usuarioController.store)  
router.put("/",Validation(UsuarioVaidator.update),auth.required,usuarioController.update)
router.delete("/", auth.required,usuarioController.remove);

module.exports = router