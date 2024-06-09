const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')

router.get('/info', controller.info)
router.post('/registration', controller.create)

module.exports = router