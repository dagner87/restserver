const { Router } = require('express');

//middleware
const { validarJWT } = require('../middleware');

//controllers
const { buscar } = require('../controllers/buscar');

/*******
   {{url}}/api/buscar

 ******/

   const router = Router();

   router.get('/:coleccion/:termino',[validarJWT], buscar);

   module.exports = router;   