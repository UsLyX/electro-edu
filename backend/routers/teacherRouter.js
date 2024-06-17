const Router = require('express')
const router = new Router()
const controller = require('../controllers/teacherController')

router.get('/questions/:id', controller.getQuestion)
router.post('/addQuestion', controller.addQuestion)
router.patch('/updateScore', controller.updateScore)

module.exports = router