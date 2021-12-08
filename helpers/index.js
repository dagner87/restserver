const dbValidartors = require('./db-validators');
const generaJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');


module.exports = {
    
    ...dbValidartors,
    ...generaJWT,
    ...subirArchivo,
}