const { response, request } = require('express');
const { Producto, Proveedor, Almacen } = require('../models');

const myCustomLabels = {
    totalDocs: 'total',
    docs: 'itemsList',
   
};

const query   = {state: true}; 

const options = {
  customLabels: myCustomLabels,  
  page: 1,
  //query: {state: false},
  limit: 10,
  collation: {
    locale: "es",
  },
  populate: [
    {
      path: "almacen",
      select: "name",
    },
    {
      path: "usuario",
      select: "name",
    },
    {
      path: "proveedor",
      select: "name",
    },
    {
      path: "categoria",
      select: "name",
    },
  ],
  
};


const crearProducto = async (req =request, res = response) => {
   
    const {state,usuario, ...info} = req.body;
    const name = req.body.name.toUpperCase();

      const productoDB  = await Producto.findOne({name});  
   
    if (productoDB) {
        return res.status(400).json({
            msg: `El Producto ${productoDB.name}, ya exite en la bd`
        });  

    } 
        
    //Generar la data a guardar

    const data = {        
        ...info,
        name,
        usuario  : req.usuario._id,          
        
    }
   
    const newProducto = new Producto(data); 

    //Guardar en BD
    await newProducto.save();

    res.status(201).json({
        newProducto
    }); 


};

const obtenerProducto = async (req,res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('proveedor','name')
    .populate('usuario','name')
    .populate('almacen','name');   
    res.json({     
        producto
    });
};

const actualizarProducto = async (req,res = response) => {
    const {id} = req.params;
    const { state, usuario, ... data } = req.body;

    // modifico el name a mayuscula
    data.name    = data.name.toUpperCase();
    //data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data ,{new:true})
                      .populate('categoria','name')
                      .populate('almacen','name')
                      .populate('proveedor','name')
                      .populate('usuario','name');

    res.json({     
        producto
    });

}


const obtenerProductosPaginados =  async (req, res = response) => {

    await Producto.paginate(query,options).then(result => {
        res.json({
            result
        })
    }).catch(error => {
        console.log(error);
    });

};

const obtenerProductos =  async (req, res = response) => {

    const { page = 1, limit= 10 } = req.query;
    const query   = {state: true}; 
    const [total,productos] = await Promise.all([

      Producto.countDocuments(query),
      Producto.find(query)
        .populate('categoria','name')
        .populate('almacen','name')
        .populate('proveedor','name')
        .populate('usuario','name')
        .skip(Number(page))
        .limit(Number(limit))]
);

    res.json({
        total,
        productos
    });
}

const eliminarProducto = async (req,res = response) => {
    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {state:false} ,{new:true})
                        .populate('categoria','name')
                        .populate('almacen','name')
                        .populate('proveedor','name')
                        .populate('usuario','name');

    res.json({     
        productoBorrado
    });

}





module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
    obtenerProductosPaginados
}