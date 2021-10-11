const { response } = require('express');

const Clientes = require('../models/clientes.model');


const getClientes = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [clientes, total] = await Promise.all([
        Clientes
        .find({}, 'nombre dni telefono email domicilio observaciones')
        .skip(desde)
        .limit(50)
        .populate('usuario', 'nombre apellido email img'),

        Clientes.countDocuments()
    ]);

    res.json({
        ok: true,
        clientes,
        total
    });
};

const getClientesById = async(req, res = response) => {

    const id = req.params.id;

    try {

        const cliente = await Clientes.findById(id)
            .populate('usuario', 'nombre apellido email img');

        res.json({
            ok: true,
            cliente
        });

    } catch (error) {

        console.log(error);
        res.json({
            ok: true,
            msg: 'Error al encontrar cliente por id'
        });
    }
};


//Petición asincrona 'async'
const crearCliente = async(req, res = response) => {

    //para que se grabe qué usuario ha creado el nuevo pedido, debemos buscar el uid que ya se encuentra identificado en el token al momento de loguearse
    const uid = req.uid;

    const cliente = new Clientes({
        usuario: uid,
        ...req.body
    });

    try {

        const clientesDB = await cliente.save();

        res.json({
            ok: true,
            cliente: clientesDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insesperado al crear cliente'
        });
    }
};


const actualizarCliente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const clientes = await Clientes.findById(id);

        if (!clientes) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrado por id'
            });
        }

        const cambiosClientes = {
            ...req.body,
            usuario: uid
        };
        //{new:true} >>> muestra los datos mas actualizados
        const clientesActualizados = await Clientes.findByIdAndUpdate(id, cambiosClientes, { new: true });

        res.json({
            ok: true,
            clientesActualizados
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al actualizar cliente'
        });
    }
};

const borrarCliente = async(req, res = response) => {

    const id = req.params.id;

    try {

        const clientes = await Clientes.findById(id);

        if (!clientes) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un cliente con ese id'
            });
        }

        await Clientes.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cliente elminado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado al borrar cliente'
        });
    }
};


module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    borrarCliente,
    getClientesById
};