const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const DigitalizacaoSchema = Schema({
    transportadora: { type: Schema.Types.ObjectId, ref: "Transportadora", required: true },
    qtde_digitalizacoes: { type: Number, required: true },
    horarios: [{ type: Date }]
}, { timestamps: true });

DigitalizacaoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Digitalizacao", DigitalizacaoSchema)