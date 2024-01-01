//IMPORTAR LIBRERÍAS
//importar router de express
const {Router} = require('express')
// importación de los controladores
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser, confirmEmail } = require('../controllers/user.controller')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')

//INSTANCIAR ROUTER
const router = Router()

//RUTA PARA MOSTRAR EL FORMULARIO DE REGISTRO
router.get('/user/register',renderRegisterForm)
//RUTA PARA CAPTURAR LA INFORMACIÓN DEL FORMULARIO Y ALMACENARLA EN LA BASE DE DATOS
router.post('/user/register',registerNewUser)

//RUTA PARA MOSTRAR EL FORMULARIO DE LOGIN
router.get('/user/login', redirectIfAuthenticated,renderLoginForm)
//RUTA PARA CAPTURAR LOS DATOS DEL FORM DE LOGIN Y REALIZAR EL PROCESO DE LOGIN
router.post('/user/login',loginUser)

//RUTA PARA REALIZAR EL CIERRE DE SESIÓN
router.post('/user/logout',logoutUser)

//RUTA PARA CONFIRMAR LA CUENTA DEL USUARIO
router.get('/user/confirmar/:token',confirmEmail)

//EXPORTAR LA VARIABLE ROUTER
module.exports =router