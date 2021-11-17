
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
 const existRole = await Role.findOne({role})
  if (!existRole) {
     throw new Error(`El rol ${ role } no está registrado en la BD`) 
  }

};

const emailExiste = async (email = '') => {
//Verificar si el correo existe    
  const existEmail = await Usuario.findOne({email});
    if(existEmail) {    
      throw new Error(`El email ${ email }, existe en la BD`) 
    }
}
module.exports = {
    esRoleValido,
    emailExiste
}