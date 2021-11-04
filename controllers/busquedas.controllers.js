const { response } = require('express');

const Usuario = require('../models/usuario.model');
const Pedidos = require('../models/pedidos.model');
const RegistroGastos = require('../models/registroGastos.model');
const Gastos = require('../models/gastos.model');
const Envios2 = require('../models/envios2.model');
const RegistroEnvios = require('../models/registroEnvios.model');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;

    //Expresión regular >> en este caso se utiliza para que la búesqueda sea insensible.
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, pedidos, envios2, gastos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Usuario.find({ apellido: regex }),
        Usuario.find({ dni: regex }),
        Usuario.find({ telefono: regex }),
        Usuario.find({ email: regex }),
        Pedidos.find({ numPedido: regex }),
        Pedidos.find({ domicilioRetiro: regex }),
        Pedidos.find({ domicilioEntrega: regex }),
        Pedidos.find({ mailCliente: regex }),
        Pedidos.find({ nombreCliente: regex }),
        Envios2.find({ nombreCliente: regex }),
        Envios2.find({ numDeEnvio: regex }),
        Gastos.find({ descripcion: regex })

    ]);

    res.json({
        ok: true,
        usuarios,
        pedidos,
        envios2,
        gastos
    });
}


const getColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    //Expresión regular >> en este caso se utiliza para que la búesqueda sea insensible.
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {

        case 'pedidos':

            data = await Pedidos.find({ nombreCliente: regex })
                .populate('usuario');

            break;

            // case 'pedidos':

            //     data = await Promise.all([

            //         Pedidos.find({ domicilioRetiro: regex }),
            //         Pedidos.find({ domicilioEntrega: regex }),
            //         Pedidos.find({ mailCliente: regex }),
            //         Pedidos.find({ nombreCliente: regex })
            //     ]);

            //     break;

        case 'gastos':

            data = await Gastos.find({ descripcion: regex })
                .populate('usuario');
            //Gastos.find({ importe: regex }),
            //Gastos.find({ usuario: regex })


            break;

        case 'envios2':

            data = await Promise.all([

                Envios2.find({ nombreCliente: regex }),
                Envios2.find({ numDeEnvio: regex })
            ]);

            break;

        case 'usuarios':

            data = await
            Usuario.find({ apellido: regex });

            break;


        case 'usuarios':

            data = await
            Usuario.find({ nombre: regex }),
                Usuario.find({ apellido: regex }),
                Usuario.find({ dni: regex }),
                Usuario.find({ telefono: regex }),
                Usuario.find({ email: regex })

            break;

        default:
            //return para finalizar. Si llego a este punto no deseo continuar.
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser gastos/usuarios/envios2/pedidos'
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