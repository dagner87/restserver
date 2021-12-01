

const Role = require('../models/role');

const {Usuario, Categoria, Producto, Almacen, Proveedor} = require('../models');

const esRoleValido = async (role = '') => {
 const existRole = await Role.findOne({role}); 
  if (!existRole) {
     throw new Error(`El rol ${ role } no está registrado en la BD`) 
  }

};

const emailExiste = async (email = '') => {
//Verificar si el correo existe    
  const existEmail = await Usuario.findOne({email});
    if(existEmail) {    
      throw new Error(`El email ${ email }, existe en la BD`);
    }
}

const exiteUsuarioPorId = async (id) => {
//Verificar si el correo existe    
  const existUsuario = await Usuario.findById(id);
    if(!existUsuario) {    
      throw new Error(`El id ${ id }, no existe en la BD`);
    }
}

/** VALIDAROR PERSONALIZADO DE CATEGORIA */
const exiteCategoriaPorId = async (id) => {
//Verificar si existe el id    
  const existCategoria = await Categoria.findById(id);
    if(!existCategoria) {    
      throw new Error(`El id ${ id }, no existe en la BD`);
    }
}
/** VALIDAROR PERSONALIZADO DE PRODUCTO */
const exiteProdutoPorId = async (id) => {
//Verificar si existe el id    
  const existProducto = await Producto.findById(id);
    if(!existProducto) {    
      throw new Error(`El id ${ id }, no existe en la BD`);
    }
}
/** VALIDAROR PERSONALIZADO DE ALMACEN */
const exiteAlmacenPorId = async (id) => {
  //Verificar si existe el id    
    const existeAlmacen = await Almacen.findById(id);
      if(!existeAlmacen) {    
        throw new Error(`El id ${ id }, no existe en la BD`);
      }
  }
/** VALIDAROR PERSONALIZADO DE PROVEEDOR */
const exiteProveedorPorId = async (id) => {
  //Verificar si existe el id    
    const existe = await Proveedor.findById(id);
      if(!existe) {    
        throw new Error(`El id ${ id }, no existe en la BD`);
      }
  }




module.exports = {
    esRoleValido,
    emailExiste,
    exiteUsuarioPorId,
    exiteCategoriaPorId,
    exiteProdutoPorId,
    exiteAlmacenPorId,
    exiteProveedorPorId
}