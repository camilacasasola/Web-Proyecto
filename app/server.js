const cors = require('cors');
const { connect } = require('./database.js');
//const restaurant = require('./routes/restaurante.js');
//const bebida = require('./routes/bebida.js');
const express = require('express');
require ('dotenv').config();


const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
connect()
//app.use(restaurant)
//app.use(bebida)

app.listen(PORT,() => {
  console.log(`Server up on: http://localhost:${PORT}`)
})