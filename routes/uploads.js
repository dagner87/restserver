const { Router } = require('express');

//middleware
const { validarJWT } = require('../middleware');

//controllers
const { cargarArchivo } = require('../controllers/uploads');

/*******
   {{url}}/api/uploads

 ******/

   const router = Router();

   router.post('/',[validarJWT], cargarArchivo);

   module.exports = router;   