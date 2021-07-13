const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const path = require('path');
const fs = require('fs');



const cargarArchivo = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    //Validar tipo
    const tiposValidos = ['envios', 'gastos', 'pedidos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es correcto. Sólo envios, gastos, pedidos o usuarios'
        });
    }

    //Validar que se haya seleccionado un archivo. Que exista un archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se seleccionó ningún archivo'
        });
    }

    //Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); //Cortamos en el punto, podamos tener un archivo con nombre: nombre.1.2.jpg >> necesitamos la extensión
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; //Con el length - 1 tomamos la última posición. Es decir .jpg

    //Validar extensión
    const extensionesValidas = ['jpg', 'png', 'jpeg', 'pdf', 'JPG', 'PNG', 'PDF', 'JPEG'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    //Generar el nombre del archivo, para que no se superpongan si se suben 2 img con el mismo nombre.
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Crear el path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen al destino deseado
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos. Para no guardar las imágenes que reemplazamos.
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });


}

//Enviar la imagen que queremos mostrar
const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);

    //Imagen por defecto, por si no se ha subido alguna imagen.
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}



module.exports = {
    cargarArchivo,
    retornaImagen
}