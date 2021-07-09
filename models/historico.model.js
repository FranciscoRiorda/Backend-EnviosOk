const { Schema, model } = require('mongoose')

const HistoricoSchema = Schema({

    dineroDisponible: {
        type: String,
        require: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Historico' });

HistoricoSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Historico', HistoricoSchema);