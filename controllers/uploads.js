const { response } = require('express');
const path         = require('path');
const fs           = require('fs');
const cloudinary   = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { subirArchivo } = require('../helpers');

const { Usuario, Producto,Categoria } = require('../models');




const cargarArchivo = async(req,res = response) => {
  
      try {

        //Subir imagenes
        //const imagenes =  await subirArchivo(req.files,undefined,'imgs');

        //Subir pdf
        const  uploadData =  await subirArchivo(req.files,['pdf'],'usuarios');
        res.json({
          uploadData
        });

      } catch (error) {
        res.status(400).json({
          error
        });
      }
    
};

const actualizarArchivo = async (req,res = response) => {

  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });        
      }
     break;
     case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          });          
        }
      break;
  
    default:
      return res.status(500).json({msg: "No está implementado otro modelo"});
  }

  //Limpiar imagenes previas
  if (modelo.img) {
     //Hay que borrar la imagen del servidor
     const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
     if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
     }
  }

  const imagenes =  await subirArchivo(req.files,undefined,coleccion);
  modelo.img = imagenes;
  await modelo.save();

  res.json({
    modelo
  });
};

//Subir imagenes a un servidor externo
const actualizarArchivoCloudinary = async (req,res = response) => {

  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });        
      }
     break;
     case 'categorias':
        modelo = await Categoria.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe una categoria con el id ${id}`,
          });          
        }
      break;
     case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          });          
        }
      break;
  
    default:
      return res.status(500).json({msg: "No está implementado otro modelo"});
  }

  //Limpiar imagenes previas
  if (modelo.img) {
     //Hay que borrar la imagen del servidor
     const nombreArr = modelo.img.split('/');
     // devuelve la ultima posicion del array
     const nombre = nombreArr[nombreArr.length - 1];
     const [public_id] = nombre.split('.');
     cloudinary.uploader.destroy(public_id);
  }
  //Subiendo archivo a cloudinary
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();

  res.json({
    modelo
  }); 
};

const mostrarImagen = async (req,res = response) => {
  const {id,coleccion} = req.params;
  let modelo;
  switch (coleccion) {
    
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });        
      }
     break;
     case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un producto con el id ${id}`,
          });          
        }
      break;
  
    default:
      return res.status(500).json({msg: "No está implementado otro modelo"});
  }

  //Limpiar imagenes previas
  if (modelo.img) {
     //Hay que borrar la imagen del servidor
     const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
     if (fs.existsSync(pathImagen)) {
       return res.sendFile(pathImagen);
     }
  }
  const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
  res.sendFile(pathImagen);
};





module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarArchivoCloudinary
}