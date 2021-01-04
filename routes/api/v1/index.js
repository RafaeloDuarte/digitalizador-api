const router = require('express').Router()

router.use("/usuarios", require("./usuarios"));
router.use("/digitalizacoes", require('./digitalizacoes'))
router.use("/transportadoras", require("./transportadoras"));

module.exports = router