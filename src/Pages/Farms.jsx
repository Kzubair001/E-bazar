import React, { useState } from 'react'
import './Farms.scss'
import Product from './Farms Components/Product'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { collection, doc, setDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import { onSnapshot } from 'firebase/firestore';


const Farms = ({ user }) => {
  const [farm, setFarm] = useState([])
  const [products, setProducts] = useState([])
  const [categoryProduct, setCategoryProduct] = useState([])
  const [searchParams, setSearchParams] = useState('')

  let list = [];
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
          setProducts(list)
          setCategoryProduct(list)
          console.log(list);
        });
      }, (error) => {
        console.log(error)
      }

    )
    return () => {
      unsub();
    }
  }, [])

  const handleClick=async(prod)=>{
    const {id, title, price, itemImageUrl,discription} = prod
    await setDoc(doc(db,'users',user?.uid, 'cart', id),{
      item:id,
      title:title,
      price:price,
      itemImageUrl:itemImageUrl,
      discription:discription,
      quantity:1,
      farm:user.uid,
    })
    toast.success(`Item Added to the Cart`)
  }

  const handle1 = () => {
    setCategory('vegetables')
    setCategoryProduct(products.filter(product => product.category === 'Vegetables'))

  }
  const handle2 = () => {
    setCategory('fruits')
    setCategoryProduct(products.filter(product => product.category === 'Fruits'))
  }
  const handle3 = () => {
    setCategory('poultry')
    setCategoryProduct(products.filter(product => product.category === 'Poultry Items'))
  }
  const handle4 = () => {
    setCategory('dairy')
    setCategoryProduct(products.filter(product => product.category === 'Dairy Items'))
  }
  const handle5 = () => {
    setCategory('')
    setCategoryProduct(products)
  }
  
  const onChange = (e) => {
    const val = e.target.value.toLowerCase()
    setSearchParams(val)
    if(val!=''){
      setCategory('')
      setCategoryProduct(products.filter(product => ((product.title.toLowerCase().includes(searchParams))||(product.discription.toLowerCase().includes(searchParams)))))
    }else{setCategoryProduct(products)}
    console.log(categoryProduct);
  }


  const [category, setCategory] = useState()
  return (
    <>
      <div className='farm-navbar container'>
        <div className='farm-nav row'>
          {/* <p>Categories</p> */}

          <ul className='col-md-7 col-lg-6 col-sm-12'>
            <li onClick={handle5} className={`${category === 'vegetables' && 'activeCategory'}`} >All</li>
            <li onClick={handle1} className={`${category === 'vegetables' && 'activeCategory'}`} >Vegetables</li>
            <li onClick={handle2} className={`${category === 'fruits' && 'activeCategory'}`} >Fruits</li>
            <li onClick={handle3} className={`${category === 'poultry' && 'activeCategory'}`} >Poultry Items</li>
            <li onClick={handle4} className={`${category === 'dairy' && 'activeCategory'}`}>Dairy Items</li>
          </ul>
          <input className='col-md-7 col-lg-5 col-sm-12' type="search" placeholder='Search' onChange={onChange}/>
        </div>
      </div>
      <div className='div-2'>
        <div className="product-container">
          {categoryProduct.map((product) => {
            return (
              <Product key={product.id} product={product} farm={farm} handleClick={handleClick}/>
            )
          }
          )}
        </div>
      </div>
    </>
  )
}

export default Farms
