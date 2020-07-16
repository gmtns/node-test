import cors from 'cors'
import express from 'express'
import setRoutes from './routes'
import path from 'path'
import http from 'http'
import io from 'socket.io'

const app = express()
app.use(cors())
const httpServer = http.createServer(app)
const socketIo = io(httpServer)

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '../', '../', '../', 'images')))

setRoutes(app, socketIo)

export default httpServer
