const { Router } = require('express');
const { check } = require('express-validator');

//middleware
const { validarJWT, validarCampos, validarArchivoSubir } = require('../middleware');

//helpers
const { colecionesPermitidas } = require('../helpers');

//controllers
const { cargarArchivo, actualizarArchivo } = require('../controllers/uploads');


/*******
   {{url}}/api/uploads

 ******/

   const router = Router();

   router.post('/',[validarJWT,validarArchivoSubir], cargarArchivo);

   //ACTUALIZAR ARCHIVOS
   router.put('/:coleccion/:id',[
     validarJWT,
     validarArchivoSubir,
     check('id','No es un id de Mongo válido').isMongoId(),
     check('coleccion').custom(c => colecionesPermitidas(c , ['usuarios','productos','proveedores'])), 
     validarCampos
  ], actualizarArchivo);
   
   module.exports = router;   