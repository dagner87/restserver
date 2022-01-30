const { response } = require("express");

const {Almacen} = require('../models');


/* Config */

const myCustomLabels = {
    totalDocs: 'total',
    docs: 'itemsList',
   
};

const query   = {state: true,}; 

const options = {
  customLabels: myCustomLabels,
  limit: 20,
  collation: {
    locale: "es",
  },
  /* populate: [
   
    {
      path: "usuario",
      select: "name",
    },
   
  ],
   */
};
/** */

const obtenerAlmacenPaginados =  async (req, res = response) => {

    await Almacen.paginate(query,options).then(result => {
        res.json({
            result
        })
    }).catch(error => {
        console.log(error);
    });

};


const obtenerAlmacen = async (req,res = response) => {
    const {id} = req.params;
    const almacen = await Almacen.findById(id);

    res.json({     
     almacen
    });

}

const crearAlmacen =  async (req, res = response) => {   
    
    const {identificador} = req.body;
    const name = req.body.name.toUpperCase();
    const almacenDB = await Almacen.findOne({name});
  
    if (almacenDB) {
        return res.status(400).json({
            msg: `La almacen ${almacenDB.name}, ya exite en la bd`
        });  

    }    
    //Generar la data a guardar
    const data = {
        name,
        identificador,
        usuario: req.usuario._id,
        state:true
    }
   
    const newAlmacen = new Almacen(data); 

    //Guardar en BD
    await newAlmacen.save();

    res.status(201).json({
        ok: true,
        msg: 'Almacen creado',
        newAlmacen
    });
}

const actualizarAlmacen = async (req,res = response) => {
    const {id} = req.params;
    const { state, usuario, ... data } = req.body;

    // modifico el name a mayuscula
    data.name    = data.name.toUpperCase();
    data.usuario = req.usuario._id;

    const almacen = await Almacen.findByIdAndUpdate(id, data ,{new:true});

    res.json({  
        ok:true,
        msg: 'Almacen actualizada',   
     almacen
    });

}
const eliminarAlmacen = async (req,res = response) => {
    const {id} = req.params;
    //const almacenBorrada = await Almacen.findByIdAndUpdate(id, {state:false} ,{new:true});
     // Borra el usuario fisicamente de la bd
    const almacenBorrado = await Almacen.findByIdAndDelete(id);

    res.json({ 
        ok:true,
        msg: 'Almacen eliminado',    
        almacenBorrado
    });

}






module.exports = {
    crearAlmacen,
    obtenerAlmacen,
    obtenerAlmacen,
    actualizarAlmacen,
    eliminarAlmacen,
    obtenerAlmacenPaginados
}