const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const calendarRoutes = require('./routes/calendar')
const doctorRoutes = require('./routes/doctor')
const orderRoutes = require('./routes/order')
const patientRoutes = require('./routes/patient')
const serviceRoutes = require('./routes/service')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,} )
.then(() => console.log('MongoDB connected.'))
.catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')('cors'))

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/service', serviceRoutes)

module.exports = app