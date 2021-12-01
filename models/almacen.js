const { Schema, model } = require('mongoose');

const AlmacenSchema = Schema({
  
    name:{
       type:String,
       require:[true,'El name es obligatorio'],
       unique:true  
   },
    identificador:{
       type:String,
       require:[true,'El identificador es obligatorio'],
       unique:true  
   }
   
   
});

module.exports = model('Almacen', AlmacenSchema);