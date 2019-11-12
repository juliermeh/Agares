const express = require('express')
const app = express()
const { getSVG, getViewBox , getCidade, getEstado} = require('./consultas/queries')
const port = 3000

//cors
var cors = require('cors')
app.use(cors())

app.get('/getEstado', getEstado)
app.get('/getSvg/:nome', getSVG)
app.get('/getViewBox/:nome', getViewBox)
app.get('/getCidade/:nome', getCidade)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})