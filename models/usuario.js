const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
   name:{
       type:String,
       required:[true,'El nombre es obligatorio']
      
   },
   email:{
       type:String,
       required:[true,'El email es obligatorio'],
       unique:true
      
   },
   password:{
       type:String,
       required:[true,'El password es obligatorio'],
   },
   img:{
       type:String,
       default: 'assets/images/dashboard/user5.jpg'
   },
   role:{
    type:String,
    required: true,
    enum:['ADMIN_ROLE','USER_ROLE']
   },

   state:{
     type:Boolean,
     default:true
    },
    remember:{
     type:Boolean,
     default:false
    },
    google:{
     type:Boolean,
     default:false
    },
   
});

UsuarioSchema.methods.toJSON = function () {
    const { __v,password,_id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);