
const { Router } = require('express');
const { check } = require('express-validator');

//Middleware
const {
     validarJWT,
     validarCampos,
     esAdminRol,
     tieneRole
    } =require('../middleware');

//Validadores
const { esRoleValido, emailExiste, exiteUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
        

const router = Router();


router.get('/', usuariosGet );

router.post('/',[
    check('name','El name es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6, max:20}),
    check('email','El email no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost );

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    check('role').custom(esRoleValido),    
    validarCampos
], usuariosPut );

router.delete('/:id',[
    validarJWT,
    //esAdminRol, Esta validacion es solo para administradores
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;