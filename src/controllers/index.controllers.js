//Renderizar la página incial (home)
const renderIndex = (req,res)=>{
    res.render('index')
}

//primera función para renderizar el login
const renderLogin = (req,res)=>{
    res.render('login')
}

//Exportació de funciones
module.exports ={
    renderIndex, 
    renderLogin
}

