const pool = require('./pool.js')

const getSpecificPlayerFromGames = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT winner_faction, winner_agenda, loser_id FROM games WHERE winner_id = $1', [id], (err, win_data) => {
    if(err) throw err
    pool.query('SELECT loser_faction, loser_agenda, winner_id FROM games WHERE loser_id = $1', [id], (err, loss_data) => {
      if(err) throw err
      res.status(200).json({
        wins: win_data.rows,
        losses: loss_data.rows
      })
    })
  })
}

module.exports = getSpecificPlayerFromGames
