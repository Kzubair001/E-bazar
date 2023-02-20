import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import Logo from '.././images/EBazaar.png'
import prfImg from './logo192.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const Navbar = ({user,active,setActive}) => {
    console.log(user)
  return (
    <div className='navbar-main'>
        <div className='navbar-container'>
        <div className='navbar-logo'>
            <Link to={'/'} style={{textDecoration:'none'}} onClick={()=>{setActive('home')}}>
            <img src={Logo} alt="" />
            </Link>   
        </div>
        <div className='links-list'>
            <ul><Link to={'/'} style={{textDecoration:'none'}} onClick={()=>{setActive('home')}}>
            <li><p className={`${active==='home' ? 'active' : ''}`}>Home</p></li>
            </Link>
            <Link to={'/farms'} style={{textDecoration:'none'}} onClick={()=>{setActive('farms')}}>
            <li><p className={`${active==='farms' ? 'active' : ''}`}>Farms</p></li>
            </Link>
            <Link to={'/helpers'} style={{textDecoration:'none'}} onClick={()=>{setActive('helpers')}}>
            <li><p className={`${active==='helpers' ? 'active' : ''}`}>Hire Helpers</p></li>
            </Link>
            <li><div className='cbs'><Link to={'/cbs'} style={{textDecoration:'none'}} onClick={()=>{setActive('cbs')}}><p className={`${active==='cbs' ? 'active' : ''}`}>CBS</p></Link> <span className='cbs-featured'>Featured</span></div></li>
             
            </ul>
            <div className='auth-button'>
                {!user ? (<Link to={'/auth'} onClick={()=>{setActive('auth')}}>
                <button className={`${active === 'auth' ? 'active-btn':''}`}>Sign Up</button>
                </Link>):(
                <div className='navbar-profile-div'>
                    <Link to={'/cart'}>
                    <ShoppingCartOutlinedIcon style={{color:'rgb(60, 60, 60)',fontSize:'30px',marginRight:'10px',cursor:'pointer'}} className='shopping-cart'/>
                    </Link>
                    <Link to={`/profile`} onClick={()=>{setActive('profile')}} style={{textDecoration:'none'}}>
                    <button className={active==='profile' && 'profile-active-btn'}>
                    <p>{user.displayName}</p>
                    </button>
                    </Link>
                </div>
                )}
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar