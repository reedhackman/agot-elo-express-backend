const pool = require('./pool.js')

const getAllDecks = (req, res) => {
  pool.query('SELECT * FROM decks', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getAllDecks
