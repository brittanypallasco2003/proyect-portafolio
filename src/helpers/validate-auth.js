
//Crear un método para validar la protección de rutas y a la vez exportar la función
module.exports.isAuthenticated = (req,res,next)=>{
    //validar si existe una autenticación
    if(req.isAuthenticated()){
        //proceso de continuar
        return next()
    }
    //proceso de redireccionar al login
    res.redirect('/user/login')
}

//Creación de un método para validar lo siguiente:
//Si el usuario ya está autenticado, redirige a otra página, caso contrario se presenta la página de login
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}