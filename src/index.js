
// cargar todas las variables de entorno en la aplicacion
require('dotenv').config()

const app = require('./server.js')
//importar el método connection
const connection=require('./database.js')
connection()

app.listen(3000,()=>{
    console.log(`Server on port ${3000}`);
})