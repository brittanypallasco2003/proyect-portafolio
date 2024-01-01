//IMPORTAR LIBRERÍAS
//importar express
const express = require('express')
//importar handlebars
const { engine }  = require('express-handlebars')
//importar path
const path = require('path');
//importar el metohod override
const methodOverride = require('method-override');
//importar passport
const passport = require('passport');
//importar express-session para manter la sesión del usuario
const session = require('express-session');
//impotar fileupload
const fileUpload = require('express-fileupload')

// INICIALIZACIONES
//instanciar express
const app = express()
//invocar el archivo de config passport
require('./config/passport')


//CONFIGURACIONES
//variables de configuraciones
app.set('port',process.env.port || 3000)
//configuraciones de fileupload
app.use(fileUpload({
    //establecer archivos temporales
    useTempFiles : true,
    //especificar el directorio donde se guardaran los archivos temporales
    tempFileDir : './uploads'
}));

// Handlebars
//establecer el directorio de las vistas
app.set('views',path.join(__dirname, 'views'))
//configuraciones para el motor de plantillas
app.engine('.hbs',engine({
    //1. establecer el archivo master (Archivo de la master page)
    defaultLayout:'main',
    //2. establecer el directorio layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    //3. establecer el directorio partials
    partialsDir: path.join(app.get('views'),'partials'),
    //4. extensión de las páginas con .hbs
    extname:'.hbs'
}))

//establecer el motor de plantillas y su extensión 
app.set('view engine','.hbs')

// MIDDLEWARS 
app.use(express.json()) //Servidor recibirá JSON
app.use(express.urlencoded({extended:false})) //Servidor recibirá info por formularios y Vistas
app.use(methodOverride('_method'))

//Establecer la sesión del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));

//inicialización
app.use(passport.initialize())
//mantener la sesión de usuario
app.use(passport.session())


//VARIABLES GLOBALES
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})

//RUTAS
app.use(require('./routers/index.routes'))//importar archivo index.routes con todas sus rutas
app.use(require('./routers/portafolio.routes'))//importar archivo portfolio.routes con todas sus rutas
app.use(require('./routers/user.routes'))//importar archivo user.routes con todas sus rutas


// ARCHIVOS ESTÁTICOS
// definir los archivos públicos para que las vistas fácilmente accedan
app.use(express.static(path.join(__dirname,'public')))

//EXPORTAR LA VARIABLE APP
module.exports = app

