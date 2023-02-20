import React, { useState } from 'react'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const ProfileNavigate = ({setBtnActive,btnActive,userData,user}) => {
  const navigate = useNavigate();
  return (
    <div className='navigate-container'>
      {userData?.admin && (
        <div>
        <div className={`nav-btn ${btnActive==='dashboard' && 'actv-btn'}`} onClick={()=>{setBtnActive('dashboard')}}>
          <DashboardCustomizeIcon style={{fontSize:'30px',color:'rgb(60, 60, 60)'}} className='icon'/>
          <p>Dashboard</p>
        </div>
        </div>
      )}
      {userData?.admin && (
        <div>
          <Link to={`/farm/${user.uid}`} style={{textDecoration:'none'}}>
          <div className={`nav-btn ${btnActive==='my-farm' && 'actv-btn'}`}>
          <AddHomeWorkIcon style={{fontSize:'30px',color:'rgb(60, 60, 60)'}} className='icon'/>
          <p>My Farm</p>
          </div>
          </Link>
        </div>
      )}
      <div className={`nav-btn ${btnActive==='profile' && 'actv-btn'}`} onClick={()=>{setBtnActive('profile')}}>
        <Person2OutlinedIcon style={{fontSize:'30px',color:'rgb(60, 60, 60)'}} className='icon'/>
        <p>Profile Info</p>
      </div>
      <div className={`nav-btn ${btnActive==='wishlist' && 'actv-btn'}`} onClick={()=>{setBtnActive('wishlist')}}>
        <FormatListBulletedOutlinedIcon style={{fontSize:'30px',color:'rgb(60, 60, 60)'}} className='icon'/>
        <p>WishList</p>
      </div>
      <div className={`nav-btn ${btnActive==='contactus' && 'actv-btn'}`} onClick={()=>{setBtnActive('contactus')}}>
        <ConnectWithoutContactOutlinedIcon style={{fontSize:'30px',color:'rgb(60, 60, 60)'}} className='icon'/>
        <p>Contact Us</p>
      </div>
      <div className='create-farm-btn'>
        {userData?.create && (
          <div>
            {!userData?.admin && (<button className={`${btnActive==='create-farm' && 'create-btn-actv'}`} onClick={()=>{setBtnActive('create-farm')}}><AddCircleOutlineIcon/>Create Farm</button>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileNavigate