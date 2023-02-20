import React, { useEffect, useState } from 'react'
import './FormCreate.scss'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { db, storage } from '../../../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
const states = [ "Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chhattisgarh",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jammu and Kashmir",
"Jharkhand",
"Karnataka",
"Kerala",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttarakhand",
"Uttar Pradesh",
"West Bengal",
"Andaman and Nicobar Islands",
"Chandigarh",
"Dadra and Nagar Haveli",
"Daman and Diu",
"Delhi",
"Lakshadweep",
"Puducherry"]

var MaharashtraState = 'Ahmadnagar Akola Amravati Aurangabad Bhandara Bhusawal Bid Buldhana Chandrapur Daulatabad Dhule Jalgaon Kalyan Karli Kolhapur Mahabaleshwar alegaon Matheran Mumbai Nagpur Nanded Nashik Osmanabad Pandharpur Parbhani Pune Ratnagiri Sangli Satara Sevagram Solapur Thane Ulhasnagar Vasai-Virar Wardha Yavatmal'
const Maharashtra=MaharashtraState.split(" ")

const initialstate = {
  firstName:'',
  lastName:'',
  email:'',
  phonenumber:null,
  farmName:'',
  address:'',
  state:'',
  city:'',
  bannerURL:'',
  zipCode:null,
  description:'',
  
}

const FormCreate = ({setFormProgress,formProgress,user}) => {
  const [form,setForm] = useState(initialstate)
  const [file,setFile] = useState(null)
  const [progress,setProgress] = useState(null)
  const {firstName,lastName,email,phonenumber,farmName,address,state,city,bannerURL,zipCode,description} = form
  const handleCreateFarm= async()=>{
    const docRef = doc(db,'users',user?.uid)
    await setDoc(docRef,{
      admin:true
    },{merge:true})
    const doc2ref = doc(db,'farms',user?.uid)
    await setDoc(doc2ref,{
      ...form,
      uid:user?.uid,
    })
    window.location.reload();
  }

  const handleStage1=()=>{
    if(firstName && lastName && email && phonenumber){
      setFormProgress('stage-2')
    }else{
      toast.error('All details are mandatory to fill')
    }
  }
  const handleStage2=()=>{
    if(farmName && address && state && city && description && zipCode){
      setFormProgress('stage-3')
    }else{
      toast.error('All fields are mandatory to fill')
    }
  }
  const handleStage3=()=>{
    if(bannerURL){
      setFormProgress('stage-4')
    }else{
      toast.error('Uploading image is mandatory')
    }
  }

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  useEffect(
    ()=>{
      console.log('problem 7')
      const uploadFile =()=>{
        const storageRef = ref(storage,file.name)
        const uploadTask = uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log('upload is '+progress+'% done')
          setProgress(progress);
          switch(snapshot.state){
            case 'paused':
              console.log('Upload is paused')
              break;
            case 'running':
              console.log('Upload is running');
              break;
              default:break;
          }
        },(error)=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setForm((prev)=>({...prev,bannerURL:downloadUrl}))
          })
        })
        toast.success('Successfully Uploaded Image')
      }
      file && uploadFile();
    },[file]
  )

  return (
      <div className='form-container'>
      {formProgress==='stage-1' && (
        <div>
        <div className='div-1'>
        <h2>What's your name?</h2>
        <input type="text" name='firstName' placeholder='First Name' onChange={handleChange}/>
        <input type="text" name='lastName' placeholder='Last Name' onChange={handleChange}/>
      </div>
      <div className='div-1 div-2'>
        <h2>Fill your Contact Info</h2>
        <input type="email" placeholder='Gmail Address' name='email' onChange={handleChange}/>
        <input type="number" placeholder='Mobile Number' name='phonenumber' onChange={handleChange}/>
      </div>
      <button className='ctn-btn' onClick={handleStage1}>Continue <ArrowCircleRightIcon/></button>
        </div>
      )}
      {formProgress==='stage-2' && (
        <div>
          <div className='div-2'>
            <h2>What would you like to name your farm?</h2>
            <input type="text" placeholder="Farm's name" name='farmName' onChange={handleChange} />
            <h2>Where's your farm located?</h2>
            <input type="text" placeholder='Farm address' name='address' onChange={handleChange}/>
            <h2>Select your State and City/Village</h2>
            <select name="state" id="" placeholder='City/Village' onChange={handleChange}>
              <option value="" hidden>Select your State</option>
              {states.map((state)=>{
                return(
                <option value={state}>
                  {state}
                </option>
                )
              })}
            </select>
            <select name="city" id="" onChange={handleChange}>
              <option value="" hidden>Select your city/village</option>
              {Maharashtra.map((city)=>{
                return(
                  <option value={city}>
                    {city}
                  </option>
                )
              })}
            </select>
            <input type="number" placeholder='Zip-Code' className="zip-code" name='zipCode' onChange={handleChange}/>
            <h2>Tell everyone something about your farm</h2>
            <textarea name="description" id="" cols="30" rows="10" onChange={handleChange}></textarea>
            <button className='ctn-btn' onClick={handleStage2}>Continue <ArrowCircleRightIcon/></button>
          </div>
        </div>
      )}
      {formProgress==='stage-3' && (
        <div className='div-3'>
          <h2>Upload a Banner for your Farm</h2>
          <div style={{display:'flex',gap:'30px'}}>
            <div className='upload-Banner' style={{overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <img src={bannerURL} alt="" style={{height:'100%'}}/>
            </div>
            <label htmlFor="imageFile" className='upload-banner-btn' style={{fontWeight:'600'}}>Upload Banner <CloudUploadIcon/></label>
            <input type="file" name='imageFile' id='imageFile' style={{display:'none'}} onChange={(e)=>{setFile(e.target.files[0])}} />
          </div>
          <button className='ctn-btn' onClick={handleStage3}>Continue <ArrowCircleRightIcon/></button>
        </div>
      )}
      {formProgress==='stage-4' && (
        <div className='div-4'>
          <h1>You are all set to go!!</h1>
          <p>You have successfully created your farm on EBazaar. Now you will be provided with a dashboard for further activities. You can upload products to your Farm, track orders, recieve payments and many more. Welcome to EBazaar :)</p>
          <button className='ctn-btn' style={{fontWeight:'600'}} onClick={handleCreateFarm}>Create Dashboard</button>
        </div>
      )}
    </div>
  )
}

export default FormCreate