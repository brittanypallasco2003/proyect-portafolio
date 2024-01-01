//importar passportjs
const passport = require('passport')
//importar el modelo User
const User = require('../models/User')
//Establecer la estrategia
const LocalStrategy = require('passport-local').Strategy

// Configuración de la estrategia
//implementar la estrategia local
passport.use(new LocalStrategy({
    //en base a email y password
    usernameField:'email',
    passwordField:'password'
    //funcion para hacer el proceso de inicio de sesión
},async(email,password,done)=>{

    //Consulta a la BDD para obtener el usuario en base al email
    const userBDD = await User.findOne({email})
    //verificar que existe el usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //verificar la contraseña del form vs bdd
    const passwordUser = await userBDD.matchPassword(password)
    //verificar si coninciden
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    //retornar el usuario de la bdd
    return done(null,userBDD)
}))

//REALIZAR EL PROCESO DE SERIALIZAR EL USUARIO
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//REALIZAR EL PROCESO DE DESEREALIZAR EL USUARIO
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});