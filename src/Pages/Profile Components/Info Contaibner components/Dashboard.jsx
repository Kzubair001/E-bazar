import React, { useState } from 'react'
import AddProducts from './Dashboard components/AddProducts'
import Analytics from './Dashboard components/Analytics'
import OrdersDone from './Dashboard components/OrdersDone'
import TrackOrders from './Dashboard components/TrackOrders'
import UpdateFarm from './Dashboard components/UpdateFarm'
import'./Dashboard.scss'
const Dashboard = ({user,userUID}) => {
  const [active,setActive]=useState('analytics')
  return (
    <div className='dashboard-container'>
      <div className='dashboard-navbar'>
        <ul>
          <li className={`${active==='analytics' && "active"}`} onClick={()=>{setActive('analytics')}}>
            Analytics
          </li>
          <li className={`${active==='add' && "active"}`} onClick={()=>{setActive('add')}}>
            Add Products
          </li>
          <li className={`${active==='update' && "active"}`} onClick={()=>{setActive('update')}}>
            Update Farm
          </li>
          <li className={`${active==='track' && "active"}`} onClick={()=>{setActive('track')}}>
            Track Orders
          </li>
          <li className={`${active==='done' && "active"}`} onClick={()=>{setActive('done')}}>
            Orders Done
          </li>
        </ul>
      </div>
      <div className='dashboard-main'>
        {active==='analytics' && (<Analytics/>)}
        {active==='add' && (<AddProducts userUID={userUID}/>)}
        {active==='update' && <UpdateFarm/>}
        {active==='track' && (<TrackOrders/>)}
        {active==='done' && (<OrdersDone/>)}
      </div>
    </div>
  )
}

export default Dashboard