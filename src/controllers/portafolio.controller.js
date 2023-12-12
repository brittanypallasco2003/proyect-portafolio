//importar el modelo
const Portfolio = require('../models/Portfolio')

//metodo para listar los portafolios
const renderAllPortafolios = async(req,res)=>{
    //listar todos los portafolios y transformar en objetos con el método .lean()
    const portafolios = await Portfolio.find().lean()
    // mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portafolios})
}

//metodo para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

//metodo para guardar una base de datos lo capturado en el form
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body//desestructurar los datos req.body
    //crear una nueva instancia
    const newPortfolio = new Portfolio({title,category,description})
    //guardar en la base de datos
    await newPortfolio.save() //devuelve un a promesa
    // mostrar el resultado
    res.json({newPortfolio})
}


//metodo para actualizar el formulario
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
//metodo para guardar el formulario
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}
//metodo para eliminar el base de datos
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}

//exporación de tipo common js nombrada
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}