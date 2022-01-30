const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
   },
   usuario: {
    type: Schema.Types.ObjectId,
    ref:'Usuario',
    required:true
}
   
   
});

//Paginacion
AlmacenSchema.plugin(mongoosePaginate);

module.exports = model('Almacen', AlmacenSchema);