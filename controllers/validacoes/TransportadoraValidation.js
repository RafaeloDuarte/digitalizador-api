const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const TransportadoraValidation = {
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
            nome: Joi.string().required(), 
            cnpj: Joi.string().length(18).required(), 
            email: Joi.string().email().required(), 
            telefones: Joi.array().items(Joi.string()).optional(), 
            endereco: Joi.object({
                local: Joi.string(),
                numero: Joi.string(),
                complemento: Joi.string(),
                bairro: Joi.string(),
                cidade: Joi.string(),
                CEP: Joi.string()
            }).optional()
        }
    },
    update: {
        body: {
            nome: Joi.string().optional(), 
            cnpj: Joi.string().length(18).optional(), 
            email: Joi.string().email().optional(), 
            telefones: Joi.array().items(Joi.string()).optional(), 
            endereco: Joi.object({
                local: Joi.string().required(),
                numero: Joi.string().required(),
                complemento: Joi.string().optional(),
                bairro: Joi.string().required(),
                cidade: Joi.string().required(),
                CEP: Joi.string().required()
            }).optional()
        }
    }
};

module.exports = { TransportadoraValidation };