const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    img:{
        type:String,
        default: 'assets/images/dashboard/product/1.jpg'
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

//Paginacion
CategoriaSchema.plugin(mongoosePaginate);



module.exports = model('Categoria',CategoriaSchema);
 