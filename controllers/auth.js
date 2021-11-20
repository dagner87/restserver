const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');




const login = async(req = request, res = response) => {

    const {email,password} = req.body;
   
    try {
        //Verificar si existe email
       const usuario = await Usuario.findOne({email});

       if (!usuario) {
        res.status(400).json({
            msg: 'Usuario / Password no son validos'
        });
       }

       //Si el usuario está activo
       if (!usuario.state) {
        res.status(400).json({
            msg: 'Usuario / Password no son validos - stateFalse'
        });
       }
        //Verificiar la contraseña

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password no son validos - password'
            });
        }
        //Generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {

         console.log(error);
         res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

     
   
   
}


module.exports = {
   login
}