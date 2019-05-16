const pool = require('./pool.js')

const getAllTournaments = (req, res) => {
  pool.query('SELECT * FROM tournaments', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getAllTournaments
