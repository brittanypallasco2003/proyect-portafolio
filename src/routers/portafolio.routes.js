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

    const {isAuthenticated} = require('../helpers/validate-auth')



    //RUTA PARA CARGAR LA VISTA DEL FORMULARIO
    router.get('/portafolio/add',isAuthenticated,renderPortafolioForm)
    //RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN LA BDD
    router.post('/portafolio/add', isAuthenticated,createNewPortafolio)
    
    // //RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
    router.get('/portafolios',isAuthenticated,renderAllPortafolios)
    router.get('/portafolios', renderAllPortafolios)
    // //RUTA PARA PRESENTAR EL DETALLE DEL PORTAFOLIO
    router.get('/portafolio/:id', isAuthenticated,renderPortafolio)
        
    // //RUTA PARA CARGAR LA VISTA DEL FORMULARIO
    router.get('/portafolio/edit/:id', isAuthenticated,renderEditPortafolioForm)
    //RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN LA BDD
    router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)
    
    //RUTA PARA ELIMINAR EL PORTAFOLIO
    router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)

    //EXPORTAR LA VARIABLE ROUTER
    module.exports = router