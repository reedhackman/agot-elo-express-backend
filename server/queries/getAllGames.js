const pool = require('./pool.js')

const getAllGames = (req, res) => {
  pool.query('SELECT * FROM games', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getAllGames
