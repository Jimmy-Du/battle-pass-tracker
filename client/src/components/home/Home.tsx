import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Game from '../../interfaces/game.interface'
import Games from '../games/Games'
import Header from '../common/header/Header'
import Spinner from '../common/spinner/Spinner'
import './Home.css'

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>()



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

    const response = await axios.post<Game[]>(`${process.env.REACT_APP_BASE_API_URL}/games`, {games: selectedGames})
    setGames(response.data)
  }



  // useEffect to make request to database to retrieve games when component is mounted
  useEffect(() => {
    getGames()
  }, [])



  return (
    <div className='home'>
      <Header text='Battle Passes'/>
      { games ? <Games games={ games }/> : <Spinner /> }
    </div>
  )
}

export default Home