import React from 'react'
import './InfoDisplay.css'

interface InfoDisplayProps {
  mainTitle: string,
  subTitle: string,
  startDate: string,
  endDate: string
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ mainTitle, subTitle, startDate, endDate }) => {
  // Function:    calculateDaysLeft()
  // Description: calculates the number of days remaining for the game's battle pass
  // Parameters:  N/A
  // Return:      the number of days remaining for the battle pass
  const calculateDaysLeft = (): number => {
    const differenceInTime: number = new Date(endDate).getTime() - new Date().getTime()
    const daysBetween: number = differenceInTime / (1000 * 3600 * 24)

    return Math.ceil(daysBetween)
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
          { new Date(startDate).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='end-date'>
        <p>
          { new Date(endDate).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' }) }
        </p>
      </span>
      <span className='days-left'>
        <p>{ calculateDaysLeft() }</p>
      </span>
    </div>
  )
}

export default InfoDisplay