import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GameInterface from '../../interfaces/game.interface'
import GameDetails from './gameDetails/GameDetails'
import Game from './game/Game'
import Spinner from '../common/spinner/Spinner'
import './Games.css'
import Header from '../common/header/Header'

const Games: React.FC = () => {
  const [games, setGames] = useState<GameInterface[]>()
  const [error, setError] = useState<String>('')



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

    try {
      const response = await axios.post<GameInterface[]>(`${process.env.REACT_APP_BASE_API_URL}/games`, {games: selectedGames})
      setGames(response.data)
    }
    catch (e: any) {
      setError('Something went wrong. Please try again.')
    }
  }



  // Function:    sortGames()
  // Description: called upon when the user clicks on each span of game details,
  //              will then sort the displayed games based on the span clicked on
  // Parameters:  sortType: a string indicating which game property the list of games
  //              will be sorted by
  // Return:      N/A
  const sortGames = (sortType: string) => {
    switch (sortType) {
      // sorts alphabetically based on the title of the game
      case 'game':
        setGames([...games!].sort((a, b) => a.title.localeCompare(b.title)))
        break;
      // sorts alphabetically based on the title of the season
      case 'season':
        setGames([...games!].sort((a, b) => a.season_title.localeCompare(b.season_title)))
        break;
      // sorts based on which season started first
      case 'start':
        setGames([...games!].sort((a, b) => new Date(a.season_start_date).getTime() - new Date(b.season_start_date).getTime()))
        break;
      // sorts based on which season ends first
      case 'end':
        setGames([...games!].sort((a, b) => new Date(a.season_end_date).getTime() - new Date(b.season_end_date).getTime()))
        break;
      default:
        break;
    }
  }



  // useEffect to make request to database to retrieve games when component is mounted
  useEffect(() => {
    getGames()
  }, [])

  return (
    <div className='games-wrapper'>
      <Header text='Battle Passes' />
      <div className='games'>
        { games ? <GameDetails sortFunction={ sortGames } /> : error ? <p>{ error }</p> : <Spinner /> }
        { games ? games.map(game => <Game game={ game } key={ game.id } />) : null }
      </div>
    </div>
  )
}

export default Games