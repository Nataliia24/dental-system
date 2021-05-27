const express = require('express')
const controllers = require('../controllers/analytics')
const passport = require('passport')
const router = express.Router()

router.get('/overview', passport.authenticate('jwt', {session: false}), controllers.overview)


module.exports = router