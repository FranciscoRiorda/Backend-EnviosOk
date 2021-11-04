const fs = require('fs'); //File System. Lo utilizaremos para corroborar si hay un pathViejo y reemplazar la img

const Usuario = require('../models/usuario.model');
const Envios2 = require('../models/envios2.model');
const Gastos = require('../models/gastos.model');
const Pedidos = require('../models/pedidos.model');



const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathVIejo = '';

    switch (tipo) {
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontró usuario con ese id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;

            if (fs.existsSync(pathViejo)) {
                //Borramos la imagen del pathViejo
                fs.unlinkSync(pathViejo, (err) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: 'Error al eliminar el archivo',
                            errors: { message: 'Error al elmiminar archivo', err }
                        });
                    };
                });
            }

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'pedidos':

            const pedido = await Pedidos.findById(id);
            if (!pedido) {
                console.log('No se encontró pedido con ese id');
                return false;
            }


            pedido.img = nombreArchivo;
            await pedido.save();
            return true;


            break;

        case 'gastos':

            const gasto = await Gastos.findById(id);
            if (!gasto) {
                console.log('No se encontró gasto con ese id');
                return false;
            }


            gasto.img = nombreArchivo;
            await gasto.save();
            return true;


            break;

        case 'envios2':

            const envio2 = await Envios2.findById(id);
            if (!envio2) {
                console.log('No se encontró envios2 con ese id');
                return false;
            }


            envio2.img = nombreArchivo;
            await envio2.save();
            return true;


            break;

    }


}

module.exports = {
    actualizarImagen
}