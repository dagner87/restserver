const mongoose = require('mongoose');

const dbConnection = async  () => {

    try {        
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('======== BASE DE DATOS CONECTADA CORRECTAMENTE ==============');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la bd');
    }

  }

  module.exports = {
    dbConnection
  }