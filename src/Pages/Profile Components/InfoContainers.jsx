import React from 'react'
import WishList from './Info Contaibner components/WishList'
import InfoProfile from './Info Contaibner components/InfoProfile'
import ContactUs from './Info Contaibner components/ContactUs'
import CreateFarm from './Info Contaibner components/CreateFarm'
import Dashboard from './Info Contaibner components/Dashboard'

const InfoContainers = ({userData,btnActive,user}) => {
  return (
    <div className='info-container'>
        {userData?.admin && (<div>{btnActive==='dashboard' && (<Dashboard user={userData} userUID ={user}/>)}</div>)}
        {btnActive==='profile' && (<InfoProfile user={userData}/>)}
        {btnActive==='wishlist' && (<WishList user={userData}/>)}
        {btnActive==='contactus' && (<ContactUs user={userData}/>)}
        {!userData?.admin && (<div>{btnActive==='create-farm' && (<CreateFarm userData={userData} user={user}/>)}</div>)}
    </div>
  )
}

export default InfoContainers