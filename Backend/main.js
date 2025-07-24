import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './servers/serve.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use('/', router)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
})
