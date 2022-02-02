const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StockProductSchema = Schema({

    proveedor: {
        type: Schema.Types.ObjectId,
        ref:'Proveedor',
        required:true
    }, 
    almacen: {
        type: Schema.Types.ObjectId,
        ref:'Almacen',
        required:true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref:'Producto',
        required:true
    },
    cantidad: {
        type:Number,
        default: 0,        
    },
    
    action: {
       type:String,
       required: true,
       enum:['ENTRADA','SALIDA']      
   }
   

});

StockProductSchema.methods.toJSON = function () {
    const { __v,state, ...data } = this.toObject();    
    return data;
}

//Paginacion
StockProductSchema.plugin(mongoosePaginate);

module.exports = model('StockProduct',StockProductSchema);
 