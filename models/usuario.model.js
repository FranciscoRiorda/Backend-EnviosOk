//conexión a mongooose
const { Schema, model } = require('mongoose');

//Asignación de atributos del usuario
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    domicilio: {
        type: String,
        require: true
    },
    nacimiento: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    }

});

//Para obtener el uid y no el _id

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);