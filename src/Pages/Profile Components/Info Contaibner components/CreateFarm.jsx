import React from 'react'
import "./CreateFarm.scss"
import FarmerLogoPng from '../../../images/farmer-logo.png'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import FormCreate from './Create Farm Components/FormCreate'
const CreateFarm = ({userData,user}) => {
  const [create,setCreate] =useState(null)
  const [formProgress,setFormProgress] = useState('stage-1')
  console.log(user)
  const handleYes=()=>{
    setCreate(true)
  }

  const handleReload=()=>{
    window.location.reload();
  }

  const handleNo=async()=>{
    setCreate(false) 
    const docRef = doc(db,'users',user?.uid)
    await setDoc(docRef,{
      create:false,
    },{merge:true})
  }

  return (
    <div className='create-from-container'>
        {create===null && (
        <div className='c-1'>
            <img src={FarmerLogoPng} alt="" />
            <h2>Are you a farmer?</h2>
            <div>
                <button className='btn' onClick={handleYes}><h1>Yes</h1></button>
                <button className='btn' onClick={handleNo}><h1>No</h1></button>
            </div>
            <div className='noti-div'>
              <p><span>Warning:</span> once selected as no, you won't be able to create a farm from this account in future. Choose yes only if you are a farmer</p>
            </div>
        </div>
        )}
        {create===false && (
          <div className='c-2'>
          <div className='c-2-div'>
          <h1>:)</h1>
          <p>Sorry, but we can't allow you further. This feature is only for farmers. You won't be able to create farm from now. You can still contact us if you clicked 'NO' by any accident</p>
          </div>
          <button onClick={handleReload}>Cancel</button>
          </div>
        )}
        {create===true && (
          <div>
          <div className='progress-bar'>
          <div className='progress-tracker'>

          </div>
          </div>
          <div className='c-3'>
            {formProgress!=='stage-4' && <h1>Create Your Farm</h1>}
            <FormCreate setFormProgress={setFormProgress} formProgress={formProgress} user={user}/>
          </div>
          </div>
        )}
    </div>
  )
}

export default CreateFarm