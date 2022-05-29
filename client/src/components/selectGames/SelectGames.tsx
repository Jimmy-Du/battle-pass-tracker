import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GameInterface from '../../interfaces/game.interface'
import SelectGame from './selectGame/SelectGame'
import Header from '../common/header/Header'
import './SelectGames.css'

const SelectGames: React.FC = () => {
  const [games, setGames] = useState<GameInterface[]>()
  const [selectedGames, setSelectedGames] = useState<Number[]>([])

  const navigate = useNavigate()



  // Function:    getGames()
  // Description: retrieves all game titles and ids from the server
  // Parameters:  N/A
  // Return:      N/A
  const getGames = async () => {
    const response = await axios.get<GameInterface[]>(`${process.env.REACT_APP_BASE_API_URL}/games`)
    setGames(response.data)
  }



  // Function:    loadSelectedGames()
  // Description: looks into local storage and sets selected games to
  //              their previous preferences in local storage
  // Parameters:  N/A
  // Return:      N/A
  const loadSelectedGames = () => {
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)) {
      setSelectedGames(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)!))
    }
  }



  // Function:    selectGameHandler()
  // Description: called upon when the user clicks on a checkbox of a game, and
  //              will add or remove the game from the selected games array 
  //              depending if it is already in the array or not
  // Parameters:  selectedGameId: the id of the game that was selected/deselected
  // Return:      N/A
  const selectGameHandler = (selectedGameId: number) => {
    // if the id of the selected game is already inside the selected games array,
    // it will be removed from the array
    if (selectedGames.includes(selectedGameId)) {
      setSelectedGames(selectedGames.filter(gameId => gameId !== selectedGameId))
    }
    // else, the id of the selected game is added to the selected games array
    else {
      setSelectedGames([...selectedGames, selectedGameId])
    }
  }



  // Function:    saveSelectedGameHandler()
  // Description: saves the user's selected games into localstorage
  // Parameters:  N/A
  // Return:      N/A
  const saveSelectedGamesHandler = () => {
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE!, JSON.stringify(selectedGames))
    navigate('/')
  }



  // useEffect to retrieve all games user can select from
  useEffect(() => {
    loadSelectedGames()
    getGames()
  }, [])


  
  return (
    <div className='select-games-wrapper'>
      <Header text='Game Selection' />
      <div className='select-games'>
        { games ? 
          games.map(game => <SelectGame key={ game.id } 
                                        game={ game } 
                                        selected={ selectedGames.includes(game.id) }
                                        onChangeHandler={selectGameHandler}/>) : 
          null }
          <button onClick={saveSelectedGamesHandler}>Save Selection</button>
      </div>
    </div>
  )
}

export default SelectGames