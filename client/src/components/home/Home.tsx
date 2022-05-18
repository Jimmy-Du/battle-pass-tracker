import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Game from '../../interfaces/game.interface'
import Games from '../games/Games'
import './Home.css'

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>()

  // Function:    getGames()
  // Description: retrieves games with battle passes from database to display
  // Parameters:  N/A
  // Return:      N/A
  const getGames = async () => {
    const response = await axios.post<Game[]>('http://localhost:5000/games', {games: []})
    setGames(response.data)
  }

  // useEffect to make request to database to retrieve games when component is mounted
  useEffect(() => {
    getGames()
  }, [])

  return (
    <div className='home'>
      { games ? <Games games={games}/> : null }
    </div>
  )
}

export default Home