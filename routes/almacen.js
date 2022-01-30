const { Router } = require('express');
const { check } = require('express-validator');


//middleware

const { validarJWT, validarCampos, esAdminRol } = require('../middleware');

//helpers

const { exiteAlmacenPorId } = require('../helpers/db-validators');

//Controllers
const { obtenerAlmacen,
        obtenerAlmacenPaginados,
        actualizarAlmacen, 
        crearAlmacen, 
        eliminarAlmacen} = require('../controllers/almacen');


/*******

{{url}}/api/storage

 ******/

const router = Router();


router.get('/',[validarJWT], obtenerAlmacenPaginados);



router.post('/',[
    validarJWT,
    check('name','El name es obligatorio').not().isEmpty(),
    validarCampos
], crearAlmacen);


router.get('/:id', [ 
     validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteAlmacenPorId),
    validarCampos
   ],obtenerAlmacen);


router.put('/:id', [
    validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteAlmacenPorId),
    check('name','El name es obligatorio').not().isEmpty(),  
    validarCampos
], actualizarAlmacen);

router.delete('/:id', [
    validarJWT,
    esAdminRol,// Esta validacion es solo para administradores
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteAlmacenPorId),
    validarCampos    
],eliminarAlmacen);



module.exports = router;