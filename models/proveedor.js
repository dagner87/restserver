const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
//Proveedor
const ProveedorSchema = Schema({
  
    name:{
       type:String,
       require:[true,'El name es obligatorio'],
       unique:true  
   },
   country:{
       type:String,
       require:[true,'El country es obligatorio'],
       default:"USA"
        
   },
   address:{
       type:String,        
   },
   phone:{
       type:Number,
       require:[true,'El phone es obligatorio'],        
   },
   contact:{
       type:String,
       require:[true,'El contact es obligatorio'],        
   },
   observations:{
       type:String,        
   },
   state:{
    type:Boolean,
    default:true,
    required:true       
}, 

usuario: {
    type: Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
}
   
});

ProveedorSchema.methods.toJSON = function () {
    const { __v,state, ...data } = this.toObject();    
    return data;
}
//Paginacion
ProveedorSchema.plugin(mongoosePaginate);

module.exports = model('Proveedor', ProveedorSchema);