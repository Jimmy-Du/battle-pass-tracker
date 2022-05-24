import React from 'react'
import GameInterface from '../../../interfaces/game.interface'
import './Game.css'

interface GameProps {
  game: GameInterface
}

const Game: React.FC<GameProps> = ({ game }) => {
  // Function:    calculateDaysLeft()
  // Description: calculates the number of days remaining for the game's battle pass
  // Parameters:  N/A
  // Return:      the number of days remaining for the battle pass
  const calculateDaysLeft = (): number => {
    const startDate: Date = new Date()
    const endDate: Date = new Date(game.season_end_date)

    const differenceInTime: number = endDate.getTime() - startDate.getTime()
    const daysBetween: number = differenceInTime / (1000 * 3600 * 24)

    return Math.ceil(daysBetween)
  }

  return (
    <div className='game'>
      <span className='game-title'>
        <p>{ game.title }</p>
      </span>
      <span className='game-season'>
        <p>{ game.season_title }</p>
      </span>
      <span className='game-start-date'>
        <p>
          { new Date(game.season_start_date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='game-end-date'>
        <p>
          { new Date(game.season_end_date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='game-days-left'>
        <p>{ calculateDaysLeft() }</p>
      </span>
    </div>
  )
}

export default Game