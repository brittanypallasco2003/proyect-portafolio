//IMPORTACIÓN DE LIBRERÍAS
//importar el Schema y el Model
const {Schema, model} = require('mongoose')


//CREAR EL ESQUEMA DE LA TABLA PORTFOLIO
const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
    },
    image:{
        public_id:String,
        secure_url:String
    }
},{
    timestamps:true
})

//EXPORTACIÓN DEL MODELO Y EL ESQUEMA
module.exports = model('portfolio',portfolioSchema)