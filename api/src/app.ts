import express from 'express'
import gameRoute from './routers/game'
require('dotenv').config()



const app: express.Application = express()



// Setup express options
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setup routes
app.use(gameRoute)



app.listen(process.env.PORT)
