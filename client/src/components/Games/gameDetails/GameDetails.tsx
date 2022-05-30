import React from 'react'
import './GameDetails.css'

interface GameDetailsProps {
  sortFunction: Function
}



// Function:    setCurrentSort()
// Description: called upon when the user clicks on one of the game detail headings,
//              will then remove the 'current-sort' class from all headings and
//              apply it to the heading that was clicked on
// Parameters:  e: info about the event that invoked the function
// Return:      N/A
const setCurrentSort = (e: any) => {
  const gameDetailHeadings = e.target.parentNode.children

  // for loop to remove the 'current-sort' class from all game detail headings
  for (let i = 0; i < gameDetailHeadings.length; i++) {
   gameDetailHeadings[i].classList.remove('current-sort')
  }

  // applies the 'current-sort' class to the heading that was just clicked
  e.target.classList.add('current-sort')
}



const GameDetails: React.FC<GameDetailsProps> = ({ sortFunction }) => {
  return (
    <div className='game-details' onClick={(e) => setCurrentSort(e)}>
      <span className='game-detail' onClick={() => sortFunction('game')}>Game</span>
      <span className='season-detail' onClick={() => sortFunction('season')}>Season</span>
      <span className='start-detail' onClick={() => sortFunction('start')}>Start</span>
      <span className='end-detail' onClick={() => sortFunction('end')}>End</span>
      <span className='days-detail' onClick={() => sortFunction('end')}>Days Left</span>
    </div>
  )
}

export default GameDetails