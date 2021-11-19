const { response, request } = require('express');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
   const { page = 1, limit= 10 } = req.query;
   const query = {state: true};

   /* const usuarios = await Usuario.find(query)
       .skip(Number(page))
       .limit(Number(limit));
  const total = await Usuario.countDocuments(query); 
  */
    const [total,usuarios] = await Promise.all([

      Usuario.countDocuments(query),
      Usuario.find(query)
         .skip(Number(page))
         .limit(Number(limit))]
    );

    res.json({
        total,
        usuarios
    });
}

const usuariosPost =  async (req, res = response) => {
   
    const {name,email,password,role} = req.body;
    const usuario = new Usuario({name,email,password,role});   

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();    
    usuario.password = bcryptjs.hashSync(password,salt);    
    //Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password,google, ...resto } = req.body;

    // TODO validar contra bd
    if (password) {
         // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();    
    resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    //Guardar en BD
    //await usuario.save();
   // console.log(usuario);


    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borra el usuario fisicamente de la bd
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    // Actualiza el usuario state del usuario en la bd
    const usuario = await Usuario.findByIdAndUpdate(id,{state:false});

    res.json({
        msg: 'El usuario ha sido borrado',
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}