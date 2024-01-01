//IMPORTAR LIBRERÍAS
//importar dotenv
require('dotenv').config()//-->cargar todas las variables de entorno en la aplicacion


//IMPORTACIÓN DE LA VARIABLES
//importación de la variable app
const app = require('./server.js')
//importar la función connection
const connection=require('./database.js')
//invocar la función connection
connection()


//Ejecutar el servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})