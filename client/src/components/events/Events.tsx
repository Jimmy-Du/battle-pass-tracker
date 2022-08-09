import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EventInterface from '../../interfaces/event.interface'
import Event from './event/Event'
import Header from '../common/header/Header'
import EventDetails from './eventDetails/EventDetails'
import Spinner from '../common/spinner/Spinner'
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
      case 'game':
        setEvents([...events!].sort((a, b) => a.title.localeCompare(b.title)))
        break;
      // sorts alphabetically based on the title of the event
      case 'event':
        setEvents([...events!].sort((a, b) => a.event_title.localeCompare(b.event_title)))
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
      { events ? <EventDetails sortFunction={ sortEvents } /> : error ? <p>{ error }</p> : <Spinner /> }
      { events ? events.map(event => <Event event={ event } key={event.id } />) : null }
      { events?.length === 0 ? <p>No ongoing events for selected games.</p> : null }
      </div>
    </div>
  )
}

export default Events