//importar el modelo usuario
const User = require('../models/User')
//importar passport
const passport = require("passport")

//--------MÉTODOS PARA EL REGISTRO--------
//MÉTODO PARA MOSTRAR EL FORMULARIO DE REGISTRO
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//MÉTODO PARA CAPTURAR LA INFORMACIÓN DEL FORMULARIO Y ALMACENAR EN BDD
const registerNewUser = async(req,res)=>{
    //capturar los datos del req.body
    const{name,email,password,confirmpassword} = req.body
    //validar si todos los campos están llenos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //consultar a la BDD para obtener un usuario en base a un email
    const userBDD = await User.findOne({email})
    //verificar si el usuario ya se encuentra registrado 
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //crear una nueva instancia para registrar un nuevo usuario
    const newUser = await new User({name,email,password,confirmpassword})
    //encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    //guardar en la base de datos
    newUser.save()
    //redireccionamiento
    res.redirect('/user/login')
}

//--------MÉTODOS PARA EL LOGIN--------
//MÉTODO PARA MOSTRAR EL FORMULARIO DE LOGIN
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

//MÉTODO PARA REALIZAR EL INICIO DE SESIÓN CON LOS DATOS DEL FORM
const loginUser = passport.authenticate('local',{
    //si todo sale mal - redireccionar al login
    failureRedirect:'/user/login',
    // si todo sale bien - redireccionar a la vista portafolios
    successRedirect:'/portafolios'
})

//--------MÉTODOS PARA EL CIERRE DE SESIÓN--------
//MÉTODO PARA REALIZAR EL CIERRE DE SESIÓN
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

//EXPORTACIÓN DE LOS MÉTODOS (CONTROLADORES)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}