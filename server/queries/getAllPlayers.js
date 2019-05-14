const pool = require('./pool.js')

const getAllPlayers = (req, res) => {
  pool.query('SELECT * FROM players', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getAllPlayers
