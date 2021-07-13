const { Schema, model } = require('mongoose')

const PedidosSchema = Schema({

    nombreCliente: {
        type: String,
        require: true
    },
    diaRetiro: {
        type: String,
        require: true
    },
    domicilioRetiro: {
        type: String,
        require: true
    },
    nombreEntregPaq: {
        type: String,
        require: false
    },
    telEntregPaq: {
        type: Number,
        require: false
    },
    estadoRetiro: {
        type: String,
        require: true,
        default: 'Pendiente'
    },
    diaEntrega: {
        type: String,
        require: true
    },
    domicilioEntrega: {
        type: String,
        require: true
    },
    nombreRecibePaq: {
        type: String,
        require: false,
    },
    telRecibePaq: {
        type: Number,
        require: false
    },
    mailCliente: {
        type: String,
        require: true
    },
    observacones: {
        type: String,
        require: false
    },
    costoEnvio: {
        type: String,
        require: true
    },
    estadoEntrega: {
        type: String,
        require: true,
        default: 'Pendiente'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    img: {
        type: String
    }
}, { collection: 'Pedidos' });

PedidosSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Pedidos', PedidosSchema);