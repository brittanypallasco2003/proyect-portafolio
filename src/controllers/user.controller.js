//importar el modelo usuario
const User = require('../models/User')
//importar passport
const passport = require("passport")

//mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//capturar los datos del formulario y almacenar bdd
const registerNewUser = async(req,res)=>{
    //capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    //validar todos los campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //validar si el usuario está ya registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //crear una nueva instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    //encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    //guardar en la base de datos
    newUser.save()
    //redireccionamiento
    res.redirect('/user/login')
}

//mostrar el formulario de login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
//capturar los datos del formulario y realizar el proceso de login en conjunto con bdd

const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

//cerrar sesión del usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}
//exportar los métodos (controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}