const Router = require('express')
const router = new Router()
const controller = require('../controllers/studentController')

router.get('/getTeachers', controller.getTeachers)
router.post('/predmets', controller.predmets)
router.post('/students', controller.students)
router.post('/addAnswer', controller.addAnswer)



module.exports = router