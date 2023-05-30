import express, { Application, Request, Response, NextFunction } from 'express'
import { QueryResult } from 'pg'
import pool from '../db/db'
const router: Application = express()



// Route:       POST /games
// Description: Gets all battle passes of games if no games are specified.
//              If games are specified only the battle passes of the games specified are returned.
// Access:      Public
router.post('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if no array or an empty array is passed in the request body, all games will be sent back
    if (req.body.games === undefined || req.body.games.length === 0) {
      const games: QueryResult = await pool.query("SELECT * FROM game WHERE season_title != ''")
      res.status(200).send(games.rows)
    }
    // else, the specified games in the array are sent back
    else {
      const games: QueryResult = await pool.query(
        "SELECT * FROM game WHERE id = ANY($1::int[]) AND season_title != ''", [req.body.games])
      res.status(200).send(games.rows)
    }
  }
  catch {
    res.status(500).send({error: "Something went wrong"})
  }
})



// Route:       GET /games
// Description: Gets all game titles
// Access:      Public
router.get('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games: QueryResult = await pool.query("SELECT id, title FROM game WHERE season_title != ''")
    res.status(200).send(games.rows)
  }
  catch {
    res.status(500).send({error: "Something went wrong"})
  }
})



export default router