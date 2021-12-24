
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middleware');
const { validarCampos } = require('../middleware/validar-campos');

const { login, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),  
    check('password','El password debe ser mas de 6 letras').isLength({min:6, max:20}),
    validarCampos
], login );


router.get( '/renew',
    validarJWT,
    renewToken
)




module.exports = router;