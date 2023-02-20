import React from 'react'
import './OfferHeader.scss'
const OfferHeader = ({user}) => {
  return (
    <div className='offerHeader-container'>
      {!user ? (<p>Sign Up! now and start shopping from your local farmers</p>):(<p>Hello! {user.displayName}, browse the farms to start shopping now</p>)}  
    </div>
  )
}

export default OfferHeader