const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({

    name:{
        type:String,
        required:[true,'El name es obligatorio'],
        unique:true
       
    },
    descripcion:{
        type:String,
        required:[true,'El descripcion es obligatorio'],   
       
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

CategoriaSchema.methods.toJSON = function () {
    const { __v,state, ...data } = this.toObject();    
    return data;
}



module.exports = model('Categoria',CategoriaSchema);
 