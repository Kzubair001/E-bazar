import React from 'react'
import InfoContainers from './Profile Components/InfoContainers'
import ProfileNavigate from './Profile Components/ProfileNavigate.component'
import { useState } from 'react'
import './Profile.scss'
import { useParams } from 'react-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
const Profile = ({user}) => {
  const [btnActive,setBtnActive] = useState('profile')
  const [userData,setUserData] =useState([])

  useEffect(()=>{
    getUserData();
    console.log('rendering')
  },[user])

  const getUserData= async()=>{
    const docRef = doc(db,'users',user?.uid);
    const userDetails =await getDoc(docRef)
    setUserData(userDetails.data());
  }
  console.log(user?.uid)
  const navigate = useNavigate
  return (
    <div >
        <div className='profile-container'>
          <ProfileNavigate setBtnActive={setBtnActive} btnActive={btnActive} userData={userData} user={user}/>
          <InfoContainers btnActive={btnActive} userData={userData} user={user}/>
        </div>
     </div>
  )
}

export default Profile