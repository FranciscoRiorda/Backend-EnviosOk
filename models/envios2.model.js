const { Schema, model } = require('mongoose');

const Envios2Schema = Schema({

    fechaEnvio: {
        type: String,
        require: true
    },
    numDeEnvio: {
        type: String,
        require: true
    },
    nombreCliente: {
        type: String,
        require: true
    },
    observaciones: {
        type: String,
        require: false
    },
    costoEnvio: {
        type: String,
        require: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    img: {
        type: String
    }
}, { collection: 'Envios2' });

Envios2Schema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Envios2', Envios2Schema);