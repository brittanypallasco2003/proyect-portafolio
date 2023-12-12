//primera función para renderizar el index

const renderIndex = (req,res)=>{
    res.render('index')
}

//primera función para renderizar el login

const renderLogin = (req,res)=>{
    res.render('login')
}
 
module.exports ={
    renderIndex, 
    renderLogin
}

