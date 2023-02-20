import React from 'react'
import Banner from './Home Components/Banner.component'
import HomeSection2 from './Home Components/HomeSection2'

const Home = ({user,setActive}) => {
  return (
    <div className='home-container'>
        <Banner user={user} setActive={setActive}/>
        <HomeSection2/>
    </div>
  )
}

export default Home