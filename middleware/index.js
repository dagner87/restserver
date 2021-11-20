const validarCampos  = require('../middleware/validar-campos');
const  validarJWT    = require('../middleware/validar-jwt');
const varlidarRoles = require('../middleware/validar-roles');


module.exports = {
...validarCampos,
...validarJWT,
...varlidarRoles,    
}



