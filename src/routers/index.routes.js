//IMPORTAR LIBRERÍAS
//importar routes de express
const {Router} = require('express')

//instanciar router
const router = Router()

//Importación de los métodos del controlador
const { renderIndex, renderLogin } = require('../controllers/index.controllers')

//RUTAS
//Ruta Home
router.get('/',renderIndex)
//Ruta Login
router.get('/login',renderLogin)


//EXPORTAR LA INSTANCIA ROUTER
module.exports = router