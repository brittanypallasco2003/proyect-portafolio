//IMPORTAR LIBRERÍAS
//importar routes de express
const {Router} = require('express')

//instanciar router
const router = Router()

//Importación de los métodos (ontroladores)
const { renderIndex } = require('../controllers/index.controllers')

//RUTAS
//Ruta Home
router.get('/',renderIndex)

//EXPORTAR LA INSTANCIA ROUTER
module.exports = router