//conexión a mongooose
const { Schema, model } = require('mongoose');

//Asignación de atributos del usuario
const ClientesSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    dni: {
        type: String,
        require: true,
        unique: true
    },
    telefono: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    domicilio: {
        type: String,
        require: true
    },
    observaciones: {
        type: String,
        require: false
    },
    usuario: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Clientes' });

ClientesSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();
    return Object;
});

module.exports = model('Clientes', ClientesSchema);