import cors from 'cors'
import express from 'express'
import setRoutes from './routes'
import path from 'path'

const app = express()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '../', '../', '../', 'images')))
app.use(cors())

setRoutes(app)

export default app
