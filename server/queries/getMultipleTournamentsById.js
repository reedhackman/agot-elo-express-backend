const pool = require('./pool.js')

const getMultipleTournamentsById = (req, res) => {
  let idsArray = JSON.parse(req.params.idsArray)
  let id = req.params.id
  let resRows = []
  let sqlString = 'SELECT * FROM tournaments WHERE '
  if(idsArray.length){
    sqlString += 'tournament_id = ' + idsArray[0]
    for(let i = 1; i < idsArray.length; i++){
      sqlString += ' OR tournament_id = ' + idsArray[i]
    }
    sqlString += ' ORDER BY tournament_date'
  }
  pool.query(sqlString, (err, data) => {
    if(err) throw err
    data.rows.forEach((tournament) => {
      let count = 1
      tournament.players.forEach((p) => {
        if(p == id){
          resRows.push({
            id: tournament.tournament_id,
            name: tournament.tournament_name,
            date: (tournament.tournament_date.getMonth() + 1) + '/' + tournament.tournament_date.getDate() + '/' + tournament.tournament_date.getFullYear(),
            totalPlayers: tournament.players.length,
            playerPosition: count
          })
        }
        count++
      })
    })
    res.status(200).json(resRows)
  })
}

module.exports = getMultipleTournamentsById
