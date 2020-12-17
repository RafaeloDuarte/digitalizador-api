const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const TransportadoraSchema = Schema({
    nome: { type: String, required: true },
    cnpj: { type: Number, required: true },
    telefones: { type: [{ type: String }] },
    deletado: { type: Boolean, default: false },
    endereco: {
        type: {
            local: { type: String },
            numero: { type: String },
            complemento: { type: String },
            bairro: { type: String },
            cidade: { type: String },
            estado: { type: String },
            CEP: { type: String }
        }
    }
}, { timestamps: true });

TransportadoraSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transportadora", TransportadoraSchema)