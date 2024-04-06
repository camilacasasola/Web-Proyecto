import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { connect } from './database.js';
import restaurant from './routes/restaurante.js'
import bebida from './routes/bebida.js'


const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
connect()
app.use(restaurant)
app.use(bebida)

app.listen(PORT,() => {
  console.log(`Server up on: http://localhost:${PORT}`)
})