import React from 'react'
import './InfoDisplaySortMobile.css'

interface InfoDisplaySortMobileProps {
  sortFunction: Function,
  mainTitle: string,
  subTitle: string
}

const InfoDisplaySortMobile: React.FC<InfoDisplaySortMobileProps> = ({ sortFunction, mainTitle, subTitle }) => {
  return (
    <div className='info-display-sort-mobile'>
      <fieldset>
        <legend>Sort by:</legend>
          <select onChange={(e) => sortFunction(e.target.value)}>
            <option value='end'>Days Left</option>
            <option value='main'>{ mainTitle }</option>
            <option value='sub'>{ subTitle }</option>
            <option value='start'>Start Date</option>
            <option value='end'>End Date</option>
          </select>
      </fieldset>
    </div>
  )
}

export default InfoDisplaySortMobile