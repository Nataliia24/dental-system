const express = require('express')
const controllers = require('../controllers/calendar')
const passport = require('passport')
const router = express.Router()

router.get('/calendar', passport.authenticate('jwt', {session: false}), controllers.getOrder)

module.exports = router