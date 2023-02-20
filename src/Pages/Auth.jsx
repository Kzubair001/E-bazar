import { async } from '@firebase/util'
import React from 'react'
import { useState } from 'react'
import './Auth.scss'
import { toast } from 'react-toastify'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
const AuthUserForm={
  email:'',
  password:'',
  confirmPassword:'',
  firstName:'',
  lastName:'',
}

const Auth = ({user}) => {
  const [authForm,setAuthForm] = useState(AuthUserForm) 
  const [login,setLogin] =useState(false)
  const {email,password,confirmPassword,firstName,lastName}=authForm
  const navigate = useNavigate()
  const handleChange=(e)=>{
    setAuthForm({...authForm,[e.target.name]:e.target.value})
  }

  const handleAuth = async (e)=>{
    e.preventDefault();
    if(login){
      if(!password & !email){
        return toast.error("Enter Email and Password")
      }else{
        const {userr} = await signInWithEmailAndPassword(auth,email,password).catch((e)=>{
          return toast.error('Wrond Email or Password')
        })
        navigate('/')
      }
    }else{
      if(password!==confirmPassword){
        return toast.error("Password didn't match");
      }if(password && firstName && lastName && email){
        const {user} = await createUserWithEmailAndPassword(auth,email,password)
        await updateProfile(user, {displayName:`${firstName} ${lastName}`})
        await setDoc(doc(db,'users',user.uid),{
          name:user.displayName,
          admin:false,
          create:true
        })
      }else{
        return toast.error("All fields are mandatory to fill");
      }
      navigate('/')
    }
  }

  return (
    <div className='auth-container'>
        <div className='div-1'>
            <h1>{!login ? 'Sign Up':'Sign In'}</h1>
            <div className='border'>
                
            </div>
            <form action="submit" onSubmit={handleAuth}>
              {!login && (<div>
                      <input type="text" placeholder='First Name' name='firstName' className='firstName' onChange={handleChange}/>
                      <input type="text" placeholder='Last Name' name='lastName' className='lastName' onChange={handleChange}/>
                    </div>)} 
                    <input type="email" placeholder='Enter Email Address' name='email' onChange={handleChange}/>
                      <input type="password" placeholder='Enter password' name='password' onChange={handleChange}/>
                      {!login && (<input type="password" placeholder='confirm password' name='confirmPassword' onChange={handleChange}/>)}
                    <div className='span'>
                      <span>{!login ? (<p>Already has an account? <span onClick={()=>{setLogin(true)}}>Sign In Now</span></p>):(<p>Wants to create a new account?<span onClick={()=>{setLogin(false)}}> Sign Up now!</span></p>)}</span>
                    </div>
                    <button type='submit'>{!login ? 'Sign Up':'Sign In'}</button> 
            </form>
        </div>
        <div className='div-2'>

        </div>
    </div>
  )
}

export default Auth