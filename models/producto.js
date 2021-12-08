const { Schema, model } = require('mongoose');

const ProductoShema = Schema({

    name:{
        type:String,
        required:[true,'El name es obligatorio'],
        unique:true,
    },
    descripcion:{
        type:String,
    },
    img:{
        type:String,
        default:'no-image.jpg'
    },
    state:{
        type:Boolean,
        default:true,
        required:true       
    },
    precio: {
        type:Number,
        default: 0,        
    },
    cantidad: {
        type:Number,
        default: 0,        
    },
    disponible: {
        type:Boolean,
        default:true,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    almacen: {
        type: Schema.Types.ObjectId,
        ref:'Almacen',
        required:true
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref:'Proveedor',
        required:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
    

});

ProductoShema.methods.toJSON = function () {
    const { __v,state, ...data } = this.toObject();    
    return data;
}



module.exports = model('Producto',ProductoShema);
 