const Router = require('express')
const router = new Router()
const controller = require('../controllers/adminController')

router.get('/predmets/:id', controller.predmets)
router.patch('/predmets/:id', controller.addPredmets)
router.post('/predmets/:id', controller.deletePredmets)
router.get('/statements', controller.getStatements)
router.patch('/statements/change', controller.changeStatement)
router.post('/create', controller.create)

module.exports = router