import React from 'react'
import './InfoDisplay.css'

interface InfoDisplayProps {
  mainTitle: string,
  subTitle: string,
  startDate: string,
  endDate: string
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ mainTitle, subTitle, startDate, endDate }) => {
  const daysLeftDifferenceInTime: number = new Date(endDate).getTime() - new Date().getTime()
  const daysLeft: number = Number((daysLeftDifferenceInTime / (1000 * 3600 * 24)).toFixed(1))

  const totalDurationInTime: number = new Date(endDate).getTime() - new Date(startDate).getTime()
  const totalDuration: number = Math.ceil(totalDurationInTime / (1000 * 3600 * 24))

  const assignDaysLeftClass = (): string => {
    let daysLeftClass: string = ''

    // if the amount of remaining days is above half the total duration,
    // the days-left-high css class is assigned
    if (daysLeft > totalDuration / 2) {
      daysLeftClass = 'days-left-high'
    }
    // if the amount of remaining days is lower than or equal to a quarter of 
    // the total duration, the days-left-low css class is assigned
    else if (daysLeft <= totalDuration / 4) {
      daysLeftClass = 'days-left-low'
    }
    // else, the days-left-medium css class is assigned
    else {
      daysLeftClass = 'days-left-medium'
    }

    return daysLeftClass
  }

  return (
    <div className='info-display'>
      <span className='main-title'>
        <p>{ mainTitle }</p>
      </span>
      <span className='sub-title'>
        <p>{ subTitle }</p>
      </span>
      <span className='start-date'>
        <p>
          { new Date(startDate).toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='end-date'>
        <p>
          { new Date(endDate).toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className={ 'days-left ' + assignDaysLeftClass() }>
        <p>{ daysLeft }</p>
        <p className='days-left-label'>Days Left</p>
      </span>
    </div>
  )
}

export default InfoDisplay