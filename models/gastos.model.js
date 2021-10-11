const { Schema, model } = require('mongoose')

const GastosSchema = Schema({

    fecha: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    importe: {
        type: Number,
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
}, { collection: 'Gastos' });

GastosSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
})

module.exports = model('Gastos', GastosSchema);


/*
 usuarioDeCarga: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
*/