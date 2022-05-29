import React from 'react'
import GameInterface from '../../../interfaces/game.interface'
import './SelectGame.css'

interface SelectGameProps {
  game: GameInterface
  onChangeHandler: Function
  selected: boolean
}

const SelectGame: React.FC<SelectGameProps> = ({ game, onChangeHandler, selected }) => {
  return (
    <div className='select-game'>
      <label>{ game.title }</label>
      <input type='checkbox' onChange={() => onChangeHandler(game.id)} checked={selected}/>
    </div>
  )
}

export default SelectGame