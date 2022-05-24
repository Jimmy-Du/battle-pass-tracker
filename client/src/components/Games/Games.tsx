import React from 'react'
import GameInterface from '../../interfaces/game.interface'
import GameDetails from './gameDetails/GameDetails'
import Game from './game/Game'
import './Games.css'

interface GamesProps {
  games: GameInterface[]
}

const Games: React.FC<GamesProps> = ({ games }) => {
  return (
    <div className='games'>
      <GameDetails />
      { games.map( game => {
        return <Game game={ game } key={ game.id }/>
      }) }
    </div>
  )
}

export default Games