const Router = require('express')
const router = new Router()
const controller = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/info', authMiddleware, controller.info)
router.post('/registration',controller.create)
router.post('/login', controller.login)
router.patch('/update', controller.update)

module.exports = router