const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto,StockProduct } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
    'stock_product'

];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ name: regex, state: true });

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','name')
                            .populate('proveedor','name')
                            .populate('almacen','name');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    /*const productos = await Producto.find({ name: regex, state: true })
                            .populate('categoria','name')*/
    const productos = await Producto.find({
        $or: [{ name: regex }, { descripcion: regex }],
        $and: [{ state: true }]
    }).populate('categoria','name')
      .populate('almacen','name')                         
      .populate('usuario','name')                         
      .populate('proveedor','name') ;                          

    res.json({
        results: productos
    });

}
const buscarStockProduct = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
         const producto = await StockProduct.findById(termino);
                          /*  .populate('proveedor','name')
                            .populate('almacen','name')
                            .populate('product','name'); */
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    /*const productos = await Producto.find({ name: regex, state: true })
                            .populate('categoria','name')*/
  /*   const productos = await Producto.find({
        $or: [{ name: regex }, { descripcion: regex }],
        $and: [{ state: true }]
    }).populate('categoria','name')
      .populate('almacen','name')                         
      .populate('usuario','name')                         
      .populate('proveedor','name') ;     */                      

    res.json({
        results: productos
    });

}


const buscar = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
        case 'stock_product':
            buscarStockProduct(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
    }

}



module.exports = {
    buscar
}