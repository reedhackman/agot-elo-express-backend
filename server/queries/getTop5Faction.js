const pool = require('./pool.js')

const getTop5Faction = (req, res) => {
  let faction = req.params.faction
  pool.query('SELECT agenda, wins, losses FROM decks WHERE faction = $1', [faction], (err, data) => {
    if(err) throw err
    let arr = []
    let array = []
    data.rows.forEach((d) => {
      if(d.wins + d.losses > 75){
        arr.push({
          agenda: d.agenda,
          played: d.wins + d.losses,
          percent: (100 * d.wins / (d.wins + d.losses)).toFixed(1)
        })
      }
    })
    arr.sort((a, b) => {
      return b.percent - a.percent
    })
    for(let i = 0; i < 5; i++){
      array.push(arr[i])
    }
    res.status(200).json(array)
  })
}

module.exports = getTop5Faction
