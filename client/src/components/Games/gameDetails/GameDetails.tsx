import React from 'react'
import './GameDetails.css'

const GameDetails = () => {
  return (
    <div className='game-details'>
      <span className='game-detail'>Game</span>
      <span className='season-detail'>Season</span>
      <span className='start-detail'>Start</span>
      <span className='end-detail'>End</span>
      <span className='days-detail'>Days Left</span>
    </div>
  )
}

export default GameDetails