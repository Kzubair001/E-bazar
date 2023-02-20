import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Header Component/Navbar';
import OfferHeader from './Header Component/OfferHeader';
import Auth from './Pages/Auth';
import CBS from './Pages/CBS';
import Farms from './Pages/Farms';
import Helpers from './Pages/Helpers';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { auth } from './firebase';
import Profile from './Pages/Profile';
import SocialFollow from "./SocialFollow"
import Farm from './Pages/Farm';
import Cart from './Pages/Cart';
import Footer from './Footer Component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flip from 'react-reveal/Flip';
function App() {
  const [active,setACtive] = useState('home')
  const [user,setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((userinfo)=>{
      if(userinfo){
        setUser(userinfo)
      }else{
        setUser(null)
      }
    })
  },[])
  
  return (
    <div className="App">
      <OfferHeader user={user}/>
      <Navbar active={active} setActive={setACtive} user={user}/>
      <ToastContainer position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Home user={user} setActive={setACtive}/>}/>
        <Route path='/farms' element={<Farms user={user}/>}/>
        <Route path='/helpers' element={<Helpers/>}/>
        <Route path='/cbs' element={<CBS/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/auth' element={<Auth user={user}/>}/>
        <Route path='/profile' element={<Profile user={user}/>}/>
        <Route path='/farm/:id' element={<Farm user={user}/>}/>
        <Route path='/cart' element={<Cart user={user}/>}/>
      </Routes>
      <Flip/>
      <Footer/>
      <SocialFollow/>
    </div>
  );
}
export default App;

