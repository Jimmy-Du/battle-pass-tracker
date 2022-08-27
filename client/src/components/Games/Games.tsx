import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GameInterface from '../../interfaces/game.interface'
import Spinner from '../common/spinner/Spinner'
import Header from '../common/header/Header'
import InfoDisplay from '../infoDisplay/InfoDisplay'
import InfoDisplayHeadings from '../infoDisplay/InfoDisplayHeadings/InfoDisplayHeadings'
import InfoDisplaySortMobile from '../infoDisplay/InfoDisplayMobileSort/InfoDisplaySortMobile'
import './Games.css'

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
      setGames(response.data.sort((a, b) => new Date(a.season_end_date).getTime() - new Date(b.season_end_date).getTime()))
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
      case 'main':
        setGames([...games!].sort((a, b) => a.title.localeCompare(b.title)))
        break;
      // sorts alphabetically based on the title of the season
      case 'sub':
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
        { games ? <InfoDisplayHeadings 
                    sortFunction={ sortGames } 
                    mainTitle='Game' 
                    subTitle='Season' /> 
                : error ? <p>{ error }</p> : <Spinner /> }
        {games ? <InfoDisplaySortMobile 
                  sortFunction={ sortGames }
                  mainTitle='Game' 
                  subTitle='Season' /> 
                : null }
        { games ? 
                  games.map(game => 
                                    <InfoDisplay 
                                      key={game.id}
                                      mainTitle={game.title} 
                                      subTitle={game.season_title} 
                                      startDate={game.season_start_date}
                                      endDate={game.season_end_date} />) 
                : null }
      </div>
    </div>
  )
}

export default Games