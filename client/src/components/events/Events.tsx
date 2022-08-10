import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventInterface from '../../interfaces/event.interface'
import Header from '../common/header/Header'
import Spinner from '../common/spinner/Spinner'
import InfoDisplay from '../infoDisplay/InfoDisplay'
import InfoDisplayHeadings from '../infoDisplay/InfoDisplayHeadings/InfoDisplayHeadings'
import './Events.css'

const Events: React.FC = () => {
  const [events, setEvents] = useState<EventInterface[]>()
  const [error, setError] = useState<string>('')


  // Function:    getEvents()
  // Description: retrieves game events from database to display
  // Parameters:  N/A
  // Return:      N/A
  const getEvents = async () => {
    let selectedGames: number[] = []

    // if the user's preference of games is in local storage, the games will be retrieved
    if (localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)) {
      selectedGames = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE!)!)
    }

    try {
      const response = await axios.post<EventInterface[]>(`${process.env.REACT_APP_BASE_API_URL}/events`, {games: selectedGames})
      setEvents(response.data.sort((a, b) => new Date(a.event_end_date).getTime() - new Date(b.event_end_date).getTime()))
    }
    catch (e: any) {
      setError('Something went wrong. Please try again.')
    }
  }



  // Function:    sortEvents()
  // Description: called upon when the user clicks on each span of event details,
  //              will then sort the displayed events based on the span clicked on
  // Parameters:  sortType: a string indicating which event property the list of events
  //              will be sorted by
  // Return:      N/A
  const sortEvents = (sortType: string) => {
    switch (sortType) {
      // sorts alphabetically based on the title of the event
      case 'main':
        setEvents([...events!].sort((a, b) => a.event_title.localeCompare(b.event_title)))
        break;
      // sorts alphabetically based on the title of the event
      case 'sub':
        setEvents([...events!].sort((a, b) => a.title.localeCompare(b.title)))
        break;
      // sorts based on which event started first
      case 'start':
        setEvents([...events!].sort((a, b) => new Date(a.event_start_date).getTime() - new Date(b.event_start_date).getTime()))
        break;
      // sorts based on which event ends first
      case 'end':
        setEvents([...events!].sort((a, b) => new Date(a.event_end_date).getTime() - new Date(b.event_end_date).getTime()))
        break;
      default:
        break;
    }
  }



  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className='events-wrapper'>
      <Header text='Events' />
      <div className='events'>
      { events ? <InfoDisplayHeadings
                   sortFunction={ sortEvents } 
                   mainTitle='Event'
                   subTitle='Game' /> 
               : error ? <p>{ error }</p> : <Spinner /> }
      { events ? 
                  events.map(event => 
                                      <InfoDisplay 
                                        key={event.id}
                                        mainTitle={event.event_title}
                                        subTitle={event.title}
                                        startDate={event.event_start_date}
                                        endDate={event.event_end_date} />) 
               : null }
      { events?.length === 0 ? <p>No ongoing events for selected games.</p> : null }
      </div>
    </div>
  )
}

export default Events