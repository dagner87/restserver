
const { Router } = require('express');
const { check } = require('express-validator');

//Middleware
const { validarCampos } = require('../middleware/validar-campos');

//Validadores
const { esRoleValido, emailExiste } = require('../helpers/bd-validatos');

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

router.put('/:id', usuariosPut );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;