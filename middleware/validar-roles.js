const { response } = require("express")



const esAdminRol = (req ,res = response, next) => {
     
     if (!req.usuario) {
         return res.status(500).json({
             msg: 'Se quiere verificar el rol sin validar el token primero'
         });
     }

    const {role, name } = req.usuario;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: ` El ${name} no es un administrardor - No tiene permitido hacer esto`
        });        
    }

   next();
}

const tieneRole = (...roles) => {
   return (req,res= response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    
    if (!roles.includes(req.usuario.role)) {
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        });
    }
      next();
   }
}

module.exports = {
    esAdminRol,
    tieneRole
}