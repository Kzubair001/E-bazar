import React from 'react'
import './AddProducts.scss'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { db, storage } from '../../../../firebase';
import { ref } from 'firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router';
import { doc } from 'firebase/firestore';
const cats = ['Vegetables','Fruits','Poultry Items','Dairy Items']

const initialstate={
  title:'',
  price:null,
  discription:'',
  category:'',
  itemImageUrl:'',
}
const AddProducts = ({userUID}) => {
  const [form,setForm] =useState(initialstate)
  const {title,price,discription,category,itemImageUrl} = form
  const [file,setFile] = useState(null)
  const navigate = useNavigate()
  
  useEffect(
    ()=>{
      console.log('problem 7')
      const uploadFile =()=>{
        const storageRef = ref(storage,file.name)
        const uploadTask = uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log('upload is '+progress+'% done')

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
            setForm((prev)=>({...prev,itemImageUrl:downloadUrl}))
          })
        })
        toast.success('Successfully Uploaded Image')
      }
      file && uploadFile();
    },[file]
  )
  const handleChangePrice=(e)=>{
    setForm({...form,price:parseInt(e.target.value)})
  }
  const handleProductAdd=async(e)=>{
    e.preventDefault()
    if(title && price && discription && category && itemImageUrl){
      const docRef =collection(db,'farms',userUID?.uid,'products')
      await addDoc(docRef,{
        ...form,
        farm:userUID?.uid,
      })
      await addDoc(collection(db,'products'),{
        ...form,
        farm:userUID?.uid,
      })
      toast.success('Product added successfully')
      navigate(`/farm/${userUID?.uid}`)
    }else{
      toast.error('All fields are mandatory to fill')
    }
  }
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
    return (
    <div className='addProducts-Container'>
        <div className='inventory-logo'>
          <Inventory2OutlinedIcon className='inventory-icon'/>
          <h1>Add Products</h1>
        </div>        
        <div className='product-form'>
          <form action="submit" onSubmit={handleProductAdd}>
            <p>Item Name</p>
            <input type="text" placeholder='eg. Onions, Carrots' name='title' onChange={handleChange} />
            <p>Choose Category</p>
            <select name="category" id="" onChange={handleChange}>
              <option value="">Select it's category</option>
              {cats.map((cat,index)=>{
                return(
                  <option value={cat} key={index}>
                    {cat}
                  </option>
                )
              })}
            </select>
            <p>Add discription about it</p>
            <textarea name="discription" id="" cols="30" rows="10" placeholder='eg.Our onions are the most fresh ones you can find on Ebazaar' onChange={handleChange}></textarea>
            <input type="file" onChange={(e)=>setFile(e.target.files[0])} className='imageUpload'/>
            <p>Price for the item (In Rupees)</p>
            <input type="number" placeholder='50rs' name='price' onChange={handleChangePrice} min='0'/>
            <button type='submit'>Add Product to Farm</button>
          </form>
        </div>
    </div>
  )
}

export default AddProducts