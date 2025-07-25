import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './servers/serve.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins =  process.env.Url_frontend?.split(',') || ['http://localhost:5173']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}))

app.use('/', router)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
})
