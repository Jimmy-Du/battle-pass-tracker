import express from 'express'


const app: express.Application = express()

app.listen(process.env.PORT || 5000)
