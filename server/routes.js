const express = require('express')
const router = express.Router()

const db = require('./queries.js')

router.get('/games', db.getAllGames)

router.get('/games/players/:id', db.getSpecificPlayerFromGames)

router.get('/players', db.getAllPlayers)

router.get('/players/:id', db.getSpecificPlayer)

router.get('/decks', db.getAllDecks)

router.get('/decks/:faction', db.getDecksByFaction)

router.get('/decks/:faction/:agenda', db.getSpecificDeck)

router.get('/matchups', db.getAllMatchups)

router.get('/matchups/:faction/:agenda/:oppfaction/:oppagenda', db.getSpecificMatchup)

router.get('/top5faction/:faction', db.getTop5Faction)

module.exports = router
