//conexión a mongooose
const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

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
        default: 'USER_ROLE'
    }

});


//Para obtener el uid y no el _id

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


UsuarioSchema.pre('save', function(next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    });
});

module.exports = model('Usuario', UsuarioSchema);