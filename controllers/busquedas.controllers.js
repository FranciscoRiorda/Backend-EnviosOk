const { response } = require('express');

const Usuario = require('../models/usuario.model');
const Pedidos = require('../models/pedidos.model');
const Historico = require('../models/historico.model');
const Gastos = require('../models/gastos.model');
const Envios = require('../models/envios.model');
const Balance = require('../models/balance.model');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    //Expresión regular >> en este caso se utiliza para que la búesqueda sea insensible.
    const regex = new RegExp(busqueda, 'i');


    const [usuarios, usuariosApellido, domicilioRetiro, domicilioEntrega, mailCliente, nombreCliente, nombreClienteEnv, numDeEnvio] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Usuario.find({ apellido: regex }),
        Pedidos.find({ domicilioRetiro: regex }),
        Pedidos.find({ domicilioEntrega: regex }),
        Pedidos.find({ mailCliente: regex }),
        Pedidos.find({ nombreCliente: regex }),
        Envios.find({ nombreCliente: regex }),
        Envios.find({ numDeEnvio: regex }),

    ])

    res.json({
        ok: true,
        usuarios,
        usuariosApellido,
        domicilioRetiro,
        domicilioEntrega,
        mailCliente,
        nombreCliente,
        nombreClienteEnv,
        numDeEnvio
    })
}


const getColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    //Expresión regular >> en este caso se utiliza para que la búesqueda sea insensible.
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'pedidos':

            data = await Promise.all([

                Pedidos.find({ domicilioRetiro: regex }),
                Pedidos.find({ domicilioEntrega: regex }),
                Pedidos.find({ mailCliente: regex }),
                Pedidos.find({ nombreCliente: regex })
            ]);

            break;

        case 'envios':

            data = await Promise.all([

                Envios.find({ nombreCliente: regex }),
                Envios.find({ numDeEnvio: regex })
            ]);

            break;

        case 'usuarios':

            data = await Promise.all([

                Usuario.find({ nombre: regex }),
                Usuario.find({ apellido: regex }),
                Usuario.find({ dni: regex })

            ]);

            break;

        default:
            //return para finalizar. Si llego a este punto no deseo continuar.
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });

    }

    res.json({
        ok: true,
        resultados: data
    });

}

module.exports = {
    getTodo,
    getColeccion
}