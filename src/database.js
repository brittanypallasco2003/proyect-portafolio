//IMPORTACIÓN DE LIBRERÍAS
//importar moongose
const mongoose = require('mongoose')

//CADENAS DE CONEXION A BDD
//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test' -->Cadena que utiliza MONGODB ATLAS
//const MONGODB_URI = 'mongodb://localhost:27017/portfolio'-->cadena de conexión local

//CREAR UNA FUNCIÓN PARA CONECTAR LA BASE DE DATOS
connection = async()=>{
    try {
        //invocar el método connect 
         await mongoose.connect(process.env.MONGODB_URI)
         //respuesta de la promesa
        console.log("Database is connected")
    } catch (error) {
        // respuesta de la promesa
        console.log(error);
    }
}


//EXPORTAR LA FUNCIÓN
module.exports = connection