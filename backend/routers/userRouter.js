const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.get('/info', controller.info)
router.post('/registration', controller.create)
router.post('/login', controller.login)

module.exports = router