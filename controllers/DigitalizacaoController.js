const mongoose = require("mongoose")
const Digitalizacao = mongoose.model("Digitalizacao")
const Transportadora = mongoose.model("Transportadora")
const dateFormatHelper = require('../helpers/dateHelper')

class DigitalizacaoConstroller {

    //GET /
    index(req, res, next) {
        Digitalizacao.find({}).select("_id transportadora qtde_digitalizacoes horarios")
            .then(digitalizacaos => res.send({ digitalizacaos }))
            .catch(next)
    }

    //GET id/
    show(req, res, next) {
        Digitalizacao.findById(req.params.id).select("_id transportadora qtde_digitalizacoes horarios")
            .then(digitalizacao => res.send({ digitalizacao }))
            .catch(next);
    }

    //POST
    store(req, res, next) {
        const { transportadora, qtde_digitalizacoes } = req.body;
        const digitalizacao = new Digitalizacao({ transportadora, qtde_digitalizacoes });

        Digitalizacao.findOne({ 'transportadora': transportadora }).then(d => {
            if (!d) {
                digitalizacao.save().then(() => res.send({ digitalizacao })).catch(next);
                return
            }
            const updatedAt = dateFormatHelper(new Date(d.updatedAt))
            const current = dateFormatHelper(new Date())

            if (updatedAt === current) {
                if (!d) return res.status(422).send({ error: "Digitalizacao não existe." });
                if (qtde_digitalizacoes) d.qtde_digitalizacoes = d.qtde_digitalizacoes + qtde_digitalizacoes;

                d.save().then(() => res.send({ d })).catch(next);
            } else {
                digitalizacao.save().then(() => res.send({ digitalizacao })).catch(next);
                return
            }
        }).catch(next);
    }

    checkRegister(d) {
        return false
    }

    //PUT
    update(req, res, next) {
        const { transportadora: transportadoraId, qtde_digitalizacoes, horarios } = req.body;
        Digitalizacao.findById(req.query.digitalizacao).then(digitalizacao => {
            if (!digitalizacao) return res.status(422).send({ error: "Digitalizacao não existe." });

            if (transportadoraId) digitalizacao.transportadora = transportadoraId;
            if (qtde_digitalizacoes) digitalizacao.qtde_digitalizacoes = qtde_digitalizacoes;
            if (horarios) digitalizacao.horarios = horarios;

            digitalizacao.save().then(() => res.send({ digitalizacao })).catch(next);

        }).catch(next);
    }

    //DELETE
    remove(req, res, next) {
        Digitalizacao.findById(req.query.digitalizacao).then(digitalizacao => {
            if (!digitalizacao) return res.status(422).send({ error: "Digitalizacao não existe." });
            digitalizacao.remove().then(() => res.send({ deleted: true })).catch(next);
        }).catch(next);
    }

    showTransportadora(req, res, next) {
        Transportadora.findOne({ 'nome': req.params.nome })
            .then(transportadora => {
                Digitalizacao.find({ 'transportadora': transportadora.id })
                    .then(digitalizacao => res.send({ digitalizacao }))
                    .catch(next);
            }).catch(next);
    }

    showByDate(req, res, next) {
        const data = new Date(req.params.data)
        Digitalizacao.find({ 'createAt': transportadora.id })
            .then(digitalizacao => res.send({ digitalizacao }))
            .catch(next);
    }

}

module.exports = DigitalizacaoConstroller