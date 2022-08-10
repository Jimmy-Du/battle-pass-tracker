import React from 'react'
import './InfoDisplayHeadings.css'

interface InfoDisplayHeadingsProps {
  sortFunction: Function,
  mainTitle: string,
  subTitle: string
}



// Function:    setCurrentSort()
// Description: called upon when the user clicks on one of the info detail headings,
//              will then remove the 'current-sort' class from all headings and
//              apply it to the heading that was clicked on
// Parameters:  e: info about the event that invoked the function
// Return:      N/A
const setCurrentSort = (e: any) => {
  const infoDetailHeadings = e.target.parentNode.children

  // for loop to remove the 'current-sort' class from all game detail headings
  for (let i = 0; i < infoDetailHeadings.length; i++) {
   infoDetailHeadings[i].classList.remove('current-sort')
  }

  // applies the 'current-sort' class to the heading that was just clicked
  e.target.classList.add('current-sort')
}



const InfoDisplayHeadings: React.FC<InfoDisplayHeadingsProps> = ({ sortFunction, mainTitle, subTitle }) => {
  return (
    <div className='info-display-headings' onClick={(e) => setCurrentSort(e)}>
      <span className='main-title-heading' onClick={() => sortFunction('main')}>{ mainTitle }</span>
      <span className='sub-title-heading' onClick={() => sortFunction('sub')}>{ subTitle }</span>
      <span className='start-date-heading' onClick={() => sortFunction('start')}>Start</span>
      <span className='end-date-heading' onClick={() => sortFunction('end')}>End</span>
      <span className='days-left-heading' onClick={() => sortFunction('end')}>Days Left</span>
    </div>
  )
}

export default InfoDisplayHeadings