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
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {

         console.log(error);
         res.status(500).json({
             ok:false,
             msg: 'Hable con el administrador'
        });
    }

     
   
   
}

const renewToken = async(req, res = response) => {

    const uid = req.usuario._id;

    //console.log(req.usuario._id);
    
    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );
    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );



    res.json({
        ok: true,
        msg: "Nuevo token generado",
        token,
        usuario
    });

}


module.exports = {
   login,
   renewToken
}