const validarCampos  = require('../middleware/validar-campos');
const  validarJWT    = require('../middleware/validar-jwt');
const varlidarRoles = require('../middleware/validar-roles');
const validarArchivoSubir = require('../middleware/validar-archivo');


module.exports = {
...validarCampos,
...validarJWT,
...varlidarRoles,    
...validarArchivoSubir,    
}



