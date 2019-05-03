const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(cors())

app.use('/api', require('./server/routes.js'))

app.get('/', (req, res) => {
  res.json({msg: 'api endpoints for agot-elo'})
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

const maintain = require('./server/maintain.js')
