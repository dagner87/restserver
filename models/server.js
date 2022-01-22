const express    = require('express');
const cors       = require('cors');

const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/confi');

const { socketsController } = require('../sockets/sockets-controller');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);
       
        //EndPoint
        this.paths = {
            auth       : '/api/auth',
            usuarios   : '/api/usuarios',
            categorias : '/api/categorias',
            categorias_sinpaginar : '/api/categorias-sinpaginar',
            productos  : '/api/productos',
            proveedores: '/api/proveedores',
            buscar     : '/api/buscar',
            uploads    : '/api/uploads',
        }

        //Conectar a bd
        this.contectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Sockets
        this.sockets()
    }

    

    async contectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles     : true,
            tempFileDir      : '/tmp/',
            createParentPath : true
        }));

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.proveedores, require('../routes/proveedores'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        /*De Prueba */
        this.app.use( this.paths.categorias_sinpaginar, require('../routes/categorias_sinpaginar'));
    }

    sockets() {
        this.io.on("connection", socketsController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
