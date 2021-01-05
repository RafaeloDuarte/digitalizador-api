const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const DigitalizacaoValidation = {
    admin: (req,res,next) => {
        if(!req.payload.id) return res.sendStatus(401);
        const { transportadora } = req.query;
        if(!transportadora) return res.sendStatus(401);
        Usuario.findById(req.payload.id).then(usuario => {
            if(!usuario) return res.sendStatus(401);
            if(!usuario.transportadora) return res.sendStatus(401);
            if(!usuario.permissao.includes("admin")) return res.sendStatus(401);
            if(usuario.transportadora.toString() !== transportadora) return res.sendStatus(401);
            next();
        }).catch(next);
    },

    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    showByName: {
        params: {
            nome: Joi.string().required()
        }
    },

    store: {
        body: {
            transportadora: Joi.string().alphanum().length(24).required(), 
            qtde_digitalizacoes: Joi.number().integer().required(), 
        }
    },

    update: {
        body: {
            qtde_digitalizacoes: Joi.number().integer().required(), 
        }
    }
};

module.exports = { DigitalizacaoValidation };