const { Schema, model } = require('mongoose');

const BalanceSchema = Schema({

    mesAño: {
        type: String,
        require: true
    },
    gastoMes: {
        type: String,
        require: true
    },
    ingresoMes: {
        type: String,
        require: true
    },
    ganancia: {
        type: String,
        require: true
    },
    sueldosMes: {
        type: String,
        require: true
    },
    pozoInicial: {
        type: String,
        require: true
    },
    pozoFinal: {
        type: String,
        require: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    cierreMes: {
        type: String,
        require: true,
        default: 'En Curso'
    }
}, { collection: 'Balance' });

BalanceSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Balance', BalanceSchema);