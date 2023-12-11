//importar handlebars
const { engine }  = require('express-handlebars')

//importacion de express
const express = require('express')

const path = require('path');

// Inicializaciones
//instanciar express
const app = express()

// Configuraciones 
//variables de configuraciones
let port=3000
app.set('port',process.env.port || 3000)
let views="C:\Users\APLICACIONES WEB\Desktop\portafolio\src\views"
app.set('views',path.join(__dirname, 'views'))

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


// Variables globales
// Rutas 
app.use(require('./routers/index.routes'))

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

