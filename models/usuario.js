const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
   name:{
       type:String,
       require:[true,'El nombre es obligatorio']
      
   },
   email:{
       type:String,
       require:[true,'El email es obligatorio'],
       unique:true
      
   },
   password:{
       type:String,
       require:[true,'El password es obligatorio'],
   },
   img:{
       type:String,
   },
   role:{
    type:String,
    require: true,
    enum:['ADMIN_ROLE','USER_ROLE']
   },

   state:{
     type:Boolean,
     default:true
    },

    google:{
     type:Boolean,
     default:false
    },
   
});

UsuarioSchema.methods.toJSON = function () {
    const { __v,password,...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);