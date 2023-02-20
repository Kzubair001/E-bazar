import React from 'react'
import './Analytics.scss'
import AssessmentIcon from '@mui/icons-material/Assessment';
const Analytics = () => {
  return (
    <div className='analytics-container'>
        <div className='analytics-title'>
          <div className='analytics-logo'>
            <AssessmentIcon className='analytic-icon'/>
            <h1>Analytics Dashboard</h1>
          </div>
        </div>
    </div>
  )
}

export default Analytics