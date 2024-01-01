//Importar el modelo
const Portfolio = require('../models/Portfolio')

//Renderizar la página incial (home)
const renderIndex = async(req,res)=>{
    //consultar todos los portafolios, transformar a formato JSON y almacenarlos en la variable portfolios
    const portfolios = await Portfolio.find().lean()
    //invocar a la vista index y pasar la variable portfolios
    res.render('index',{portfolios})
}

//Exportació de funciones
module.exports ={
    renderIndex
}

