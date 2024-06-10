const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')

router.get('/statements', controller.getStatements)
router.patch('/statements/change', controller.changeStatement)
router.post('/create', controller.create)

module.exports = router