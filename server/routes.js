const express = require('express')
const router = express.Router()

const getAllGames = require('./queries/getAllGames.js')
const getSpecificPlayer = require('./queries/getSpecificPlayer.js')
const getAllPlayers = require('./queries/getAllPlayers.js')
const getAllDecks = require('./queries/getAllDecks.js')
const getDecksByFaction = require('./queries/getDecksByFaction.js')
const getAllMatchups = require('./queries/getAllMatchups.js')
const getSpecificMatchup = require('./queries/getSpecificMatchup.js')
const getTop5Faction = require('./queries/getTop5Faction')
const getAllTournaments = require('./queries/getAllTournaments.js')
const getMultipleTournamentsById = require('./queries/getMultipleTournamentsById.js')

router.get('/games', getAllGames)

router.get('/games/players/:id', getSpecificPlayer)

router.get('/games/matchups/:faction/:agenda/:oppfaction/:oppagenda', getSpecificMatchup)

router.get('/players', getAllPlayers)

router.get('/decks', getAllDecks)

router.get('/decks/:faction', getDecksByFaction)

router.get('/matchups', getAllMatchups)

router.get('/top5faction/:faction', getTop5Faction)

router.get('/tournaments/all', getAllTournaments)

router.get('/tournaments/ids/:idsArray', getMultipleTournamentsById)

module.exports = router
