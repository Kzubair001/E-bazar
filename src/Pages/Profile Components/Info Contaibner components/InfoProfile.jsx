import React from 'react'
import './InfoProfile.scss'
const InfoProfile = ({user}) => {
  return (
    <div className='infoProfile-container'>
        <div className='div-1'>
        <p>Profile Settings</p>
        </div>
        <div className="div-2">
        <h1>{user?.name}</h1>
        </div>
    </div>
  )
}

export default InfoProfile