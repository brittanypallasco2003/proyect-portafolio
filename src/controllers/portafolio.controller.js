//metodo para listar los portafolios
const renderAllPortafolios = (req,res)=>{
    res.send('Listar todos los portafolios')
}

//metodo para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//metodo para mostrar el formulario
const renderPortafolioForm = (req,res)=>{
    res.send('Formulario para crear un portafolio')
}

//metodo para guardar una base de datos lo capturado en el form
const createNewPortafolio = (req,res)=>{
    res.send('Crear un nuevo portafolio')
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