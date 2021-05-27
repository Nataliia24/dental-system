const express = require('express')
const passport = require('passport')
const controllers = require('../controllers/order')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controllers.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controllers.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controllers.remove)
router.post('/',passport.authenticate('jwt', {session: false}), controllers.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controllers.update)


module.exports = router