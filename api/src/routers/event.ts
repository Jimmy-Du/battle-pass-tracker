import express, { Application, Request, Response, NextFunction } from 'express'
import { QueryResult } from 'pg'
import pool from '../db/db'
const router: Application = express()



// Route:       POST /events
// Description: Gets all events of games if no games are specified.
//              If games are specified only the events of the games specified are returned.
// Access:      Public
router.post('/events', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if no array or an empty array is passed in the request body, all game events will be sent back
    if (req.body.games === undefined || req.body.games.length === 0) {
      const events: QueryResult = await pool.query("SELECT game_event.*, game.title FROM game_event " +
                                                   "JOIN game ON game_event.game_id = game.id AND game_event.event_end_date > TIMESTAMP 'today'")
      res.status(200).send(events.rows)
    }
    // else, the specified games events in the array are sent back
    else {
      const events: QueryResult = await pool.query("SELECT game_event.*, game.title FROM game_event " + 
                                                    "JOIN game ON game_event.game_id = game.id " + 
                                                    "WHERE game.id = ANY($1::int[]) AND game_event.event_end_date > TIMESTAMP 'today'", 
                                                    [req.body.games])
      res.status(200).send(events.rows)
    }
  }
  catch {
    res.status(500).send({error: "Something went wrong"})
  }
})



export default router