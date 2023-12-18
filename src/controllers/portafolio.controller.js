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
    res.redirect('/portafolios')
}


//metodo para actualizar el formulario
const renderEditPortafolioForm =async(req,res)=>{
    //consulta del portafolio en BDD con el ID
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}
//metodo para guardar el formulario
const updatePortafolio = async(req,res)=>{
    //capturar los datos del body
    const {title,category,description}= req.body
    //actualizar el portafolio en bdd
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //redireccionar
    res.redirect('/portafolios')
}
//metodo para eliminar el base de datos

const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
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