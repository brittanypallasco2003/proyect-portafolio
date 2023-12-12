//importar routes de express
const {Router} = require('express')
//instanciar router
const router = Router()

const {renderIndex,renderLogin} = require('../controllers/index.controllers.js')


router.get('/',renderIndex)
router.get('/login',renderLogin)



router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})



module.exports = router