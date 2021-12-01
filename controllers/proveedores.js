const { response } = require("express");

const {Proveedor} = require('../models');


const obtenerProveedores =  async (req, res = response) => {

    const { page = 1, limit= 10 } = req.query;
    const query   = {state: true}; 
    const [total,proveedores] = await Promise.all([

        Proveedor.countDocuments(query),
        Proveedor.find(query)
         .populate('usuario','name')
         .skip(Number(page))
         .limit(Number(limit))]
    );

    res.json({
        total,
        proveedores
    });
}

const obtenerProveedor = async (req,res = response) => {
    const {id} = req.params;
    const proveedores = await Proveedor.findById(id)
                            .populate('usuario','name');

    res.json({     
     proveedores
    });

}

const crearProveedores =  async (req, res = response) => {   
    
    const {descripcion,state,...info} = req.body;
    const name = req.body.name.toUpperCase();
    const proveedorDB = await Proveedor.findOne({name});
  
    if (proveedoresDB) {
        return res.status(400).json({
            msg: `El proveedor ${proveedorDB.name}, ya exite en la bd`
        });  

    }    
    //Generar la data a guardar
    const data = {
        name,
        ...info,       
        usuario: req.usuario._id,
        
    }
   
    const newProveedor = new Proveedor(data); 

    //Guardar en BD
    await newProveedor.save();

    res.status(201).json({
        newProveedor
    });
}

const actualizarProveedor = async (req,res = response) => {
    const {id} = req.params;
   const { state, usuario, ... data } = req.body;

    // modifico el name a mayuscula
    data.name    = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const proveedores = await Proveedores.findByIdAndUpdate(id, data ,{new:true})
                      .populate('usuario','name');

    res.json({     
     proveedores
    });

}
const eliminarProveedor = async (req,res = response) => {
    const {id} = req.params;
    const proveedoresBorrada = await Proveedores.findByIdAndUpdate(id, {state:false} ,{new:true})
                      .populate('usuario','name');

    res.json({     
        proveedoresBorrada
    });

}

module.exports = {
    crearProveedores,
    obtenerProveedor,
    obtenerProveedores,
    actualizarProveedor,
    eliminarProveedor
}