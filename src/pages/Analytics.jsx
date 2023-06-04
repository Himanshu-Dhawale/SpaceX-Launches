import React from 'react'
import RateChart from '../components/RateChart'
import RateYear from '../components/RateYear'
import "./Analytics.css"
const Analytics = () => {
  return (
    <div className='analytics-container'>
        <RateChart/>
        <RateYear/>
    </div>
  )
}

export default Analytics