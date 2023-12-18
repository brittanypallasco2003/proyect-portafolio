
//importar router de express
const {Router} = require('express')

const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')

//instanciar router
const router = Router()

//ruta para mostrar el formulario de registro
router.get('/user/register',renderRegisterForm)
//ruta para capturar los datos del formulario y almacenar en la bdd
router.post('/user/register',registerNewUser)

//ruta para mostrar el formulario del login
router.get('/user/login', redirectIfAuthenticated,renderLoginForm)
//ruta  para capturar los datos del formulario y ralizar el proceso de login en conjunto con BDD
router.post('/user/login',loginUser)

//Ruta para cerrar sesíón de usuario
router.post('/user/logout',logoutUser)

//exportar la variable router
module.exports =router