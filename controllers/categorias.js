const { response } = require("express");

const {Categoria} = require('../models');


const obtenerCategorias =  async (req, res = response) => {

    const { page = 1, limit= 10 } = req.query;
    const query   = {state: true}; 
    const [total,categorias] = await Promise.all([

      Categoria.countDocuments(query),
      Categoria.find(query)
         .populate('usuario','name')
         .skip(Number(page))
         .limit(Number(limit))]
    );

    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async (req,res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id)
                            .populate('usuario','name');

    res.json({     
     categoria
    });

}

const crearCategoria =  async (req, res = response) => {   
    
    const {descripcion} = req.body;
    const name = req.body.name.toUpperCase();
    const categoriaDB = await Categoria.findOne({name});
  
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name}, ya exite en la bd`
        });  

    }    
    //Generar la data a guardar
    const data = {
        name,
        descripcion,
        usuario: req.usuario._id,
        state:true
    }
   
    const newCategoria = new Categoria(data); 

    //Guardar en BD
    await newCategoria.save();

    res.status(201).json({
        ok: true,
        msg: 'Categoria creada',
        newCategoria
    });
}

const actualizarCategoria = async (req,res = response) => {
    const {id} = req.params;
    const { state, usuario, ... data } = req.body;

    // modifico el name a mayuscula
    data.name    = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data ,{new:true})
                      .populate('usuario','name');

    res.json({  
        ok:true,
        msg: 'Categoria actualizada',   
     categoria
    });

}
const eliminarCategoria = async (req,res = response) => {
    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {state:false} ,{new:true})
                      .populate('usuario','name');

    res.json({ 
        ok:true,
        msg: 'Categoria eliminada',    
        categoriaBorrada
    });

}






module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}