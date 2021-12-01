const { Router } = require('express');
const { check } = require('express-validator');


//middleware

const { validarJWT, validarCampos, esAdminRol } = require('../middleware');

//helpers

const { exiteCategoriaPorId, exiteProveedorPorId } = require('../helpers/bd-validatos');

//Controllers
const { obtenerProveedores } = require('../controllers/proveedores');


/*******

{{url}}/api/proveedores

 ******/

const router = Router();


router.get('/',[validarJWT], obtenerProveedores);

/* router.post('/',[
    validarJWT,
    check('name','El name es obligatorio').not().isEmpty(),
    check('state','El state es obligatorio').not().isEmpty(),
    check('country','El country es obligatorio').not().isEmpty(),
    check('phone','El phone es obligatorio').not().isEmpty().isMobilePhone(),
    validarCampos
], crearProveedores);


router.get('/:id', [ 
     validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteProveedorPorId),
    validarCampos
   ],obtenerProveedor);


router.put('/:id', [
    validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteProveedorPorId),
    check('name','El name es obligatorio').not().isEmpty(),  
    validarCampos
], actualizarProveedores);

router.delete('/:id', [
    validarJWT,
    esAdminRol,// Esta validacion es solo para administradores
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteProveedorPorId),
    validarCampos    
],eliminarProveedor);

 */

module.exports = router;