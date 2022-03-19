import fs from 'fs';
import path from 'path';
import cloudnary from 'cloudinary';
import Producto from "../models/becado.js";


cloudnary.config({
    cloud_name: 'dsvkna2xa',
    api_key: "645674333348721",
    api_secret: 'iA30CTrEl5WzrfBEnyH5G0BAF_A'
});


export const ProductoImagen = async (req, res = response) => {
    console.log(req.body)
    var xxxxx
    // const producto = new Producto( req.body );
    var prueba = await Producto.findById(req.body.id).exec();
    console.log(prueba)
    if (prueba !== null) {
        async function subirImage(x) {
            let url = await cloudinary.uploader.upload(x, (error, result) => {

                console.log('subiendoo')

                return result.secure_url;
            });

            return url.secure_url
        }


        if (req.busboy) {
            req.busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
                // ...
                console.log('guarnado')
            
                var saveTo = path.join('.', filename);

                file.pipe(fs.createWriteStream(saveTo));
                xxxxx = await subirImage(filename)

                fs.unlinkSync(filename)
            });
            req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
                // ...
            });
            req.pipe(req.busboy);
        }







        console.log(producto)
        producto.imagen = xxxxx
        producto.save()
        console.log(producto)

        res.json({
            ok: true,
            producto,
        })
    }

}



export const crearProductos = async (req, res) => {
    console.log(req.body);

    if (req.busboy) {
        req.busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            // ...
            console.log('guarnado')
            var saveTo = path.join('.', filename);

            file.pipe(fs.createWriteStream(saveTo));
            //  xxxxx = await  subirImage(filename)

            fs.unlinkSync(filename)
        });
        req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
            // ...
        });
        req.pipe(req.busboy);
    }









    // const producto = new Producto( req.body );


    //   producto.save()


    res.json({
        ok: true
    })
}


