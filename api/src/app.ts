import express from 'express'
import gameRoute from './routers/game'
import eventRoute from './routers/event'
const cors = require('cors')
require('dotenv').config()



const app: express.Application = express()



// Setup express options
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: process.env.ORIGIN
}))

// Setup routes
app.use(gameRoute)
app.use(eventRoute)



app.listen(process.env.PORT)
