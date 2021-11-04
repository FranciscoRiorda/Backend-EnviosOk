const { Schema, model } = require('mongoose')

const RegistroGastosSchema = Schema({

    dineroDisponible: {
        type: String,
        require: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'RegistroGastos' });

RegistroGastosSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
});

module.exports = model('RegistroGastos', RegistroGastosSchema);