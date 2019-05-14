const pool = require('./pool.js')

const getDecksByFaction = (req, res) => {
  const faction = req.params.faction
  pool.query('SELECT * FROM decks WHERE faction = $1', [faction], (err, data) => {
    if(err) throw err
    let arr = []
    data.rows.forEach((d) => {
      arr.push({
        agenda: d.agenda,
        percent: (100 * d.wins / (d.wins + d.losses)).toFixed(1),
        played: d.wins + d.losses
      })
    })
    res.status(200).json(arr)
  })
}

module.exports = getDecksByFaction
