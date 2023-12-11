//importar moongose
const mongoose = require('mongoose')

//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'

//cadena de conexion a bdd
//const MONGODB_URI = 'mongodb://localhost:27017/portfolio'

//crear un metodo para hacer la cadena de conexión
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


//exportar el metodo connect
module.exports = connection