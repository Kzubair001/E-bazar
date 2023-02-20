import React from 'react'
import './HomeSection2.scss'
import DashboardImg from '../../images/dashboard.png'
const HomeSection2 = () => {
  return (
    <div className='home-section-2'>
        <div className='div-1'>
            <h1>ECommerce Platform for Farmers</h1>
            <p>Today majority of farmers trade and sell their yeild through the local mandi. However the mandi system isn't offering much profit to the farmers and being a profitable business for retailers. EBazaar becomes a bridge for the farmers to create their own e-market to attract direct customers removing all inner entities.</p>
        </div>
        <div className='div-2'>
          <img src={DashboardImg} alt="" />
        </div>
    </div>
  )
}

export default HomeSection2