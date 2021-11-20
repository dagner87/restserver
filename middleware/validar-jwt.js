const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
      return res.status(404).json({
          msg:'No hay token en la peticion'
      }); 
        
    } 
    try {
        
       const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);   

       //Obtener los datos del usuario que corresponde al uid    
       const usuario = await Usuario.findById(uid);

       if (!usuario) {
        return res.status(401).json({
            msg:'Token no valido usuario no existe en BD'
        }); 
       }
       //Verficiar si el asuario tiene state = false
       if (!usuario.state) {
        return res.status(401).json({
            msg:'Token no valido usuario con state false'
        }); 
           
       }
       req.usuario = usuario;
       next();

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg:'Token no válido'
        });         
    }
}


module.exports = {
    validarJWT
}