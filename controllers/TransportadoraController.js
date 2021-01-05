const mongoose = require("mongoose")
const Transportadora = mongoose.model("Transportadora")

class TransportadoraConstroller {

    //GET /
    index(req, res, next) {
        Transportadora.find({}).select("_id nome cnpj email telefones endereco")
            .then(transportadoras => res.send({ transportadoras }))
            .catch(next)
    }

    //GET id/
    show(req, res, next) {
        Transportadora.findById(req.params.id).select("_id nome cnpj email telefones endereco")
            .then(transportadora => res.send({ transportadora }))
            .catch(next);
    }

    showByName(req, res, next) {
        Transportadora.findOne({ 'nome': req.params.nome })
            .then(transportadora => res.send({ transportadora }))
            .catch(next);
    }

    //POST
    store(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;
        const transportadora = new Transportadora({ nome, cnpj, email, telefones, endereco });
        transportadora.save().then(() => res.send({ transportadora })).catch(next);
    }

    //PUT
    update(req, res, next) {
        const { nome, cnpj, email, telefones, endereco } = req.body;
        Transportadora.findById(req.query.transportadora).then(transportadora => {
            if (!transportadora) return res.status(422).send({ error: "Transportadora não existe." });

            if (nome) transportadora.nome = nome;
            if (cnpj) transportadora.cnpj = cnpj;
            if (email) transportadora.email = email;
            if (telefones) transportadora.telefones = telefones;
            if (endereco) transportadora.endereco = endereco;

            Transportadora.save().then(() => res.send({ transportadora })).catch(next);

        })
            .catch(next);
    }

    //DELETE
    remove(req, res, next) {
        Transportadora.findById(req.query.transportadora).then(transportadora => {
            if (!transportadora) return res.status(422).send({ error: "Transportadora não existe." });
            transportadora.remove().then(() => res.send({ deleted: true })).catch(next);
        }).catch(next);
    }

}

module.exports = TransportadoraConstroller