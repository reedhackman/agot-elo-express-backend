require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.RDS_USERNAME,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT
})

const getAllGames = (req, res) => {
  pool.query('SELECT * FROM games', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getSpecificPlayerFromGames = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM games WHERE winner_id = $1 OR loser_id = $1', [id], (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getAllPlayers = (req, res) => {
  pool.query('SELECT * FROM players', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getSpecificPlayer = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM players WHERE id = $1', [id], (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getAllDecks = (req, res) => {
  pool.query('SELECT * FROM decks', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

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

const getSpecificDeck = (req, res) => {
  const faction = req.params.faction
  const agenda = req.params.agenda
  pool.query('SELECT * FROM decks WHERE faction = $1 AND agenda = $2', [faction, agenda], (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getAllMatchups = (req, res) => {
  pool.query('SELECT * FROM matchups', (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

const getSpecificMatchup = (req, res) => {
  pool.query('SELECT * FROM matchups WHERE faction = $1 AND agenda = $2 AND oppfaction = $3 AND oppagenda = $4', [faction, agenda, oppfaction, oppagenda], (err, data) => {
    if(err) throw err
    res.status(200).json(data.rows)
  })
}

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

module.exports = {
  getAllPlayers,
  getSpecificPlayer,
  getAllDecks,
  getDecksByFaction,
  getSpecificDeck,
  getAllMatchups,
  getSpecificMatchup,
  getAllGames,
  getSpecificPlayerFromGames,
  getTop5Faction
}
