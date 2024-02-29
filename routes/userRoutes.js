
const express = require('express')
const router = express.Router()
const { login, signup, current } = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')


router.post('/login', login)
router.post('/signup', signup)
router.get('/current', validateToken, current)

module.exports = router;