const { Schema, model } = require('mongoose')

const PedidosSchema = Schema({

    // numPedido: {
    //     type: Number,
    //     require: true
    // },
    nombreCliente: {
        type: String,
        require: true
    },
    mailCliente: {
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
    // nombreEntregPaq: {
    //     type: String,
    //     require: false
    // },
    telEntregaPaq: {
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
    // nombreRecibePaq: {
    //     type: String,
    //     require: false,
    // },
    telRecibePaq: {
        type: Number,
        require: false
    },
    estadoEntrega: {
        type: String,
        require: true,
        default: 'Pendiente'
    },
    costoEnvio: {
        type: Number,
        require: true
    },
    observaciones: {
        type: String,
        require: false
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
});

module.exports = model('Pedidos', PedidosSchema);