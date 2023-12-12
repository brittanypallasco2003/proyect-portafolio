//IMPORTAR ROUTER DE EXPRESS
const{Router} = require('express')

//INSTANCIAR LA VARIABLE ROUTER
const router = Router()

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controller.js')

//RUTA PARA CARGAR LA VISTA DEL FORMULARIO
router.get('/portafolio/add', renderPortafolioForm)
//RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN LA BDD
router.post('/portafolio/add', createNewPortafolio)
//RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
router.get('/portafolios', renderAllPortafolios)
//RUTA PARA PRESENTAR EL DETALLE DEL PORTAFOLIO
router.get('/portafolio/:id', renderPortafolio)

//RUTA PARA CARGAR LA VISTA DEL FORMULARIO
router.get('/portafolio/edit/:id', renderEditPortafolioForm)
//RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN LA BDD
router.put('/portafolio/edit/:id', updatePortafolio)

//RUTA PARA ELIMINAR EL PORTAFOLIO
router.delete('/portafolio/delete/:id', deletePortafolio)

//EXPORTAR LA VARIABLE ROUTER
module.exports = router