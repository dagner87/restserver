const { Router } = require('express');
const { check } = require('express-validator');


//middleware

const { validarJWT, validarCampos, esAdminRol } = require('../middleware');

//helpers

const { exiteCategoriaPorId } = require('../helpers/db-validators');

//Controllers
const { obtenerCategorias,
        obtenerCategoria, 
        actualizarCategoria, 
        crearCategoria, 
        eliminarCategoria} = require('../controllers/categorias');


/*******

{{url}}/api/categorias

 ******/

const router = Router();


router.get('/',[validarJWT], obtenerCategorias);

router.post('/',[
    validarJWT,
    check('name','El name es obligatorio').not().isEmpty(),
    check('state','El state es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


router.get('/:id', [ 
     validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
    validarCampos
   ],obtenerCategoria);


router.put('/:id', [
    validarJWT,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
    check('name','El name es obligatorio').not().isEmpty(),  
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRol,// Esta validacion es solo para administradores
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
    validarCampos    
],eliminarCategoria);



module.exports = router;