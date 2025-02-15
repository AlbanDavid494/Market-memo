import React, {useState, useEffect} from 'react'
import {updateEditItem} from '../db'

const EditModal = ({ editDetailId, editDetails, isEditToggle, setIsEditToggle, fetchItems}) => {

    

    const [inputItems, setInputItems] = useState({
        name: editDetails.itemName,
        price: editDetails.price,
        date: editDetails.date
    })

    const handleEditCancel = (e) => {
      e.preventDefault()
        setInputItems({...inputItems, 
name: '',
price: '',
date: ''
        })
        alert('item details canceled')
      }

const handleOnChange = (e) => {
    setInputItems(
        {...inputItems, [e.target.name] : e.target.value}
    )
}
   

const handleEditSave = async (inputItems, event) => {
  event.preventDefault()
    await updateEditItem(editDetailId, inputItems)
    setIsEditToggle(!isEditToggle)
    fetchItems()
    alert("item updated!")
    }

   

   
  return (
    <section className='absolute w-full h-full z-50 bg-black flex justify-center items-center mt-2'>

    <form className=' relative flex flex-col z-50 items-center justify-center bg-white shadow-lg p-2 rounded-md'>
    
    
    <div className='block relative my-2'>
      <label htmlFor="title" className='pl-1'>Item name</label>
      <input type="text" value={inputItems.name} onChange={handleOnChange} name='name'  className='border w-full p-2 my-1 rounded-md outline-none' placeholder='edit of your item' required  />
    </div>
    
    

    <div className='block relative my-2'>
      <label htmlFor="title" className='pl-1'>Item price ($)</label>
      <input type="number"  value={inputItems.price} onChange={handleOnChange} name='price'  className='border w-full p-2 my-1 rounded-md outline-none' placeholder='price of your item' required   />
    </div>

    <div className='block relative'>
      <label htmlFor="title" className='pl-1 text-sm'>Date for purchase</label>
      <input type="date" value={inputItems.date} onChange={handleOnChange} name='date'  className='border w-full p-2 my-1 rounded-md outline-none' placeholder='price of your item' required  />
    </div>

    
    
    <div className='flex justify-between py-4'>
      <button onClick={(e) => handleEditCancel(e)} className='bg-red-600 text-white p-2 rounded-md shadow-lg mr-7'>cancel edit</button>
      <button onClick={(event) => handleEditSave(inputItems,event)} className='bg-green-600 text-white p-2 rounded-md shadow-lg'>update items</button>
    
    </div>
    
    </form>
    
    </section>
  )
}

export default EditModal
