import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GameInterface from '../../interfaces/game.interface'
import GameDetails from './gameDetails/GameDetails'
import Game from './game/Game'
import Spinner from '../common/spinner/Spinner'
import './Games.css'

const Games: React.FC = () => {
  const [games, setGames] = useState<GameInterface[]>()



  // Function:    getGames()
  // Description: retrieves games with battle passes from database to display
  // Parameters:  N/A
  // Return:      N/A
  const getGames = async () => {
    let selectedGames: number[] = []

    // if the user's preference of games is in local storage, the games will be retrieved
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)) {
      selectedGames = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)!)
    }

    const response = await axios.post<GameInterface[]>(`${process.env.REACT_APP_BASE_API_URL}/games`, {games: selectedGames})
    setGames(response.data)
  }



  // useEffect to make request to database to retrieve games when component is mounted
  useEffect(() => {
    getGames()
  }, [])



  return (
    <div className='games-wrapper'>
      <div className='games'>
        { games ? <GameDetails /> : <Spinner /> }
        { games ? games.map(game => <Game game={ game } key={ game.id } />) : null }
      </div>
    </div>
  )
}

export default Games