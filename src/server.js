//importar handlebars
const { engine }  = require('express-handlebars')

//importacion de express
const express = require('express')

const path = require('path');
//importar el metohod override
const methodOverride = require('method-override');

//importar passport
const passport = require('passport');
//importar express-session para manter la sesión del usuario
const session = require('express-session');
//impotar fileupload
const fileUpload = require('express-fileupload')

// Inicializaciones
//instanciar express
const app = express()
require('./config/passport')


// Configuraciones 
//variables de configuraciones
let port=3000
app.set('port',process.env.port || 3000)
let views="C:\Users\APLICACIONES WEB\Desktop\portafolio\src\views"
app.set('views',path.join(__dirname, 'views'))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Configuraciones 
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')

// Middlewares 
//servidor va a trabjar con información en base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//configurar la sesión del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
//inicializar passportjs y session
app.use(passport.initialize())
app.use(passport.session())

// Variables globales
// Rutas 
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))


// Rutas 
app.get('/',(req,res)=>{
    res.render('index')
})

// Archivos estáticos
// definir archivos estáticos y publicos
// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

//exportar la variable app
module.exports = app

