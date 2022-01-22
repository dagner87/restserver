const { Router } = require('express');
const { check } = require('express-validator');


//middleware

const { validarJWT, validarCampos, esAdminRol } = require('../middleware');

//helpers

const { exiteCategoriaPorId } = require('../helpers/db-validators');

//Controllers
const { obtenerCategorias,
       } = require('../controllers/categorias');


/*******

{{url}}/api/categorias_sinpaginar

 ******/

const router = Router();



//categorias_sinpaginar
router.get('/',[validarJWT], obtenerCategorias);




module.exports = router;