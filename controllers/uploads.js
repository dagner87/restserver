const { response } = require('express');
const path      = require('path');

const { v4: uuidv4 } = require('uuid');



const cargarArchivo = (req,res = response) => {



    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        res.status(400).json({ msg: 'No hay archivos que subir'});
        return;
      }

      const {archivo} = req.files;
      const nombreCortado = archivo.name.split('.');
      const extension = nombreCortado[ nombreCortado.length - 1 ];

      //Validar la extencion
      const extensionesValidas = ['png','jpg'];
      
      if (!extensionesValidas.includes(extension)) {
          return res.status(400).json({
              msg: `La extención ${extension} no está permitida`
          });
      }
    
      console.log('req.files >>>', req.files); // eslint-disable-line
    
     //archivo = req.files.archivo;
      const nombreTemp = uuidv4() + '.' + extension; 
    
      const uploadPath = path.join(__dirname , '../uploads/', nombreTemp) ;
    
      archivo.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ err });
        }
    
        res.json({ msg: 'File uploaded to ' + uploadPath });
      });
};

module.exports = {
    cargarArchivo
}