const pool = require('./pool.js')

const getSpecificMatchup = (req, res) => {
  pool.query('SELECT * FROM matchups WHERE faction = $1 AND agenda = $2 AND oppfaction = $3 AND oppagenda = $4', [faction, agenda, oppfaction, oppagenda], (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

module.exports = getSpecificMatchup
