import React from 'react'
import EventInterface from '../../../interfaces/event.interface'
import './Event.css'

interface EventProps {
  event: EventInterface
}

const Event: React.FC<EventProps> = ({ event }) => {
  // Function:    calculateDaysLeft()
  // Description: calculates the number of days remaining for the game event
  // Parameters:  N/A
  // Return:      the number of days remaining for the event
  const calculateDaysLeft = (): number => {
    const startDate: Date = new Date()
    const endDate: Date = new Date(event.event_end_date)

    const differenceInTime: number = endDate.getTime() - startDate.getTime()
    const daysBetween: number = differenceInTime / (1000 * 3600 * 24)

    return Math.ceil(daysBetween)
  }



  return (
    <div className='event'>
      <span className='event-title'>
        <p>{ event.event_title }</p>
      </span>
      <span className='game-title'>
        <p>{ event.title }</p>
      </span>
      <span className='event-start-date'>
        <p>
          { new Date(event.event_start_date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='event-end-date'>
        <p>
          { new Date(event.event_end_date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='event-days-left'>
        <p>{ calculateDaysLeft() }</p>
      </span>
    </div>
  )
}

export default Event