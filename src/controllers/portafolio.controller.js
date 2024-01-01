//IMPORTAR LIBRERÍAS
//importar el modelo
const Portfolio = require('../models/Portfolio')
//IMPORTAR EL METODO upload Y delete
const { uploadImage, deleteImage } = require('../config/cloudinary')
//importar fs
const fs = require('fs-extra')



//CRUD
//MÉTODO PARA LISTAR LOS PORTAFOLIOS
const renderAllPortafolios = async(req,res)=>{
    //Almacenar todos los portafolios del usuario que inicia sesión en la variable y listar todos los portafolios y transformar en objetos con el método .lean()
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    //Invocar la vista y mandar la variable 
    res.render("portafolio/allPortfolios",{portfolios})
}

//MÉTODO PARA LISTAR EL DETALLE DE UN PORTAFOLIO
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//MÉTODO PARA MOSTRAR EL FORMULARIO
const renderPortafolioForm = (req,res)=>{
    //Invocación de la vista
    res.render('portafolio/newFormPortafolio')
}

//MÉTODO PARA GUARDAR UNA BASE DE DATOS LO CAPTURADO EN EL FORM
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body//desestructurar los datos req.body
    //crear una nueva instancia
    const newPortfolio = new Portfolio({title,category,description}) 
    //asociar al usuario que inicie sesión al portafolio
    newPortfolio.user = req.user._id
    //validar si existe una imagen
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    try{
        //invocar el método para que se almacene en cloudinary
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        newPortfolio.image = {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
        }
        //eliminar los archivos temporales
        await fs.unlink(req.files.image.tempFilePath)
    }catch(error){
        console.log(error)
    }
    //guardar en la base de datos
    await newPortfolio.save() //devuelve un a promesa
    // mostrar el resultado
    res.redirect('/portafolios')
}

//MÉTODO PARA MOSTRAR EL FORMULARIO PARA ACTUALIZAR
const renderEditPortafolioForm =async(req,res)=>{
    //consulta del portafolio en BDD con el ID
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}

//MÉTODO PARA ACTUALIZAR EN LA BDD LO CAPTURADO EN EL FORM
const updatePortafolio = async(req,res)=>{
    //obtener un portafolio en base al id
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //verificar que el usuario actualice su portafolio sea el mismo que inicie sesión
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    //Verificar si el usuario quiere actualizar la imagen o solo los campos extras
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        //eliminar la imagen de cloudinary
        await deleteImage(portfolio.image.public_id)
        //cargar la imagen nueva
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //cargar la información
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        //capturar los datos del body - desestructurar en req.body
        const {title,category,description}= req.body
        //actualizar el portafolio en bdd
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    //redireccionar a la vista portafolios
    res.redirect('/portafolios')
}


//MÉTODO PARA ELIMINAR EL PORTAFOLIO DE LA BASE DE DATOS
const deletePortafolio = async(req,res)=>{
    //utlizar el método findByandDelete
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
    res.redirect('/portafolios')
}

//EXPORTAR LAS FUNCIONES
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}