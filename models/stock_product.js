const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const StockProducSchema = Schema({

    proveedor: {
        type: Schema.Types.ObjectId,
        ref:'Proveedor',
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


   

});

StockProducSchema.methods.toJSON = function () {
    const { __v,state, ...data } = this.toObject();    
    return data;
}

//Paginacion
StockProducSchema.plugin(mongoosePaginate);



module.exports = model('Categoria',StockProducSchema);
 