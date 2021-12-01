const { Router } = require('express');
const { check } = require('express-validator');

//Middleware
const { validarJWT, validarCampos, esAdminRol } = require('../middleware');
//Helpers
const { exiteCategoriaPorId, 
        exiteProdutoPorId, 
        exiteProveedorPorId, 
        exiteAlmacenPorId } = require('../helpers/bd-validatos');

//Controllers
const { crearProducto,
       obtenerProducto, 
       actualizarProducto, 
       obtenerProductos,
       eliminarProducto} = require('../controllers/productos');


/*******
   {{url}}/api/productos

 ******/

const router = Router();


//Crear Producto
router.post('/',[ 
  validarJWT,
    check('name','El name es obligatorio').not().isEmpty(),

    check('almacen','No es un id de Mongo válido').isMongoId(),
    check('almacen').custom(exiteAlmacenPorId),
    
    check('categoria','No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(exiteCategoriaPorId),

    check('proveedor','No es un id de Mongo válido').isMongoId(),
    check('proveedor').custom(exiteProveedorPorId),
    validarCampos
],crearProducto);

//Actualizar Producto
 router.put('/:id',[ 
   check('name','El name es obligatorio').not().isEmpty(),

    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteProdutoPorId),

    check('almacen','No es un id de Mongo válido').isMongoId(),
    check('almacen').custom(exiteAlmacenPorId),
    
    check('categoria','No es un id de Mongo válido').isMongoId(),
    check('categoria').custom(exiteCategoriaPorId),

    check('proveedor','No es un id de Mongo válido').isMongoId(),
    check('proveedor').custom(exiteProveedorPorId),
],actualizarProducto); 

//Obtener un  Producto
router.get('/:id', [ 
  validarJWT,
 check('id','No es un id de Mongo válido').isMongoId(),
 check('id').custom(exiteProdutoPorId),
 validarCampos
],obtenerProducto);

router.get('/',[validarJWT], obtenerProductos);

router.delete('/:id', [
  validarJWT,
  esAdminRol,// Esta validacion es solo para administradores
  check('id','No es un id de Mongo válido').isMongoId(),
  check('id').custom(exiteProdutoPorId),
  validarCampos    
],eliminarProducto);



module.exports = router;