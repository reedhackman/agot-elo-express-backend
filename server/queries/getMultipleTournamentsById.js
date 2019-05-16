const pool = require('./pool.js')

const getMultipleTournamentsById = (req, res) => {
  let idsArray = JSON.parse(req.params.idsArray)
  let id = req.params.id
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
      //
    })
    res.status(200).json(data.rows)
  })
}

module.exports = getMultipleTournamentsById
