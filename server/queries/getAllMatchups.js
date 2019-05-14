const pool = require('./pool.js')

const getAllMatchups = (req, res) => {
  pool.query('SELECT * FROM matchups', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getAllMatchups
