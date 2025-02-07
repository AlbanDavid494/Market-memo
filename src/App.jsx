import React, {useState, useEffect} from 'react'
import {addItem, deleteItem, getItems, updateItem} from './db'


function App() {
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')
  const [proposedPrice, setProposedPrice] = useState('')
  const [actualPrice, setActualPrice] = useState(0)
  const [dueDate, setDueDate] = useState('')
  const [editingItem, setEditingItem] =useState(null)

  const handleItemNameOnChange = (e) => {
    setItemName(e.target.value)
  }

  const handlePropesedPriceOnChange = (e) => {
    setProposedPrice(e.target.value)
  }

  const handleActualPriceOnChange = (e) => {
    setActualPrice(e.target.value)
  }

const handleDueDateOnChange = (e) => {
  setDueDate(e.target.value)
}

  const fetchItems = async () => {
    const allItems = await getItems();
    setItems(allItems)
  }

const handleAddItems = async (event) => {
  event.preventDefault()
  const itemData = {
    itemName: itemName, 
    proposedPrice : parseFloat(proposedPrice),
    actualPrice: parseFloat(actualPrice),
    dueDate
  };

if(editingItem){
  await updateItem({...itemData, id: editingItem})
  setEditingItem(null)
} else{
  await addItem(itemData)
}

setItemName('')
setProposedPrice('')
setActualPrice('')
setDueDate('')
fetchItems()   
// refreshes after adding or refreshing

}

const handleDelete = async (id) => {
  await deleteItem(id)
  fetchItems()
  // refresh the list after deleting
}



useEffect(() => {
  fetchItems();
  // when components mounts fetch items
},[])

  return (
    <>
    <h2 className='text-3xl m-4 font-semibold'>Market memo</h2>
    <p className='text-gray-600 font-mono ml-5 my-3'>Welome to Market memo , the ultimate shopping companion. <br />With Market memo, You can effortlessly create and manage your market lists, ensuring that you never forget an item again.</p>

    <section className='w-full flex justify-center items-center mt-2'>
     
<form  className='border max-w-sm w-full p-4 rounded-md shadow-lg mx-4 my-4' onSubmit={handleAddItems}>

<div className='block relative my-2'>
  <label htmlFor="title" className='pl-1'>Item name</label>
  <input type="text" value={itemName} onChange={handleItemNameOnChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='name of your item' required  />
</div>

<div className='block relative'>
  <label htmlFor="title" className='pl-1'>proposed amount $</label>
  <input type="number" value={proposedPrice} onChange={handlePropesedPriceOnChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='amount of your item' required />
</div>

<div className='block relative my-2'>
  <label htmlFor="title" className='pl-1'>actual amount $</label>
  <input type="number" value={actualPrice} disabled onChange={handleActualPriceOnChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='amount of your item' required  />
</div>

<div className='block relative my-2'>
  <label htmlFor="dueDate" className='pl-1'>Due Date</label>
  <input type="date" value={dueDate} onChange={handleDueDateOnChange} name="dueDate" id="dueDate" className='border w-full p-2 rounded-md my-1 outline-none' required/>
</div>



<div className='flex justify-center py-4'>

  <button className='bg-black text-white p-2 rounded-md shadow-lg'>add items</button>
</div>

</form>

    </section>


{/* market list */}
<section>

<p className='font-mono pl-7 my-5 mx-6'>We've got you covered, here are your list 👇</p>

<section className=' my-5 mx-7 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4'>
  {
    items.map((eachItem) => (
      <div key={eachItem.id} className='border rounded-md p-5'>
<div>
<p>{eachItem.ItemName}</p>

<div className='flex justify-between items-center'>
  <p className='font-semibold'>Actual Price ($)</p>
<p>{eachItem.actualPrice}</p>

</div>


<div className='flex justify-between items-center'>
  <span className='font-semibold'>Proposed Price ($) :</span>
<input type='number' disabled className=' w-16 text-center border rounded-md py-1' value={eachItem.proposedPrice}/> 
 
</div>

<p className='my-2 font-semibold text-red-400'>{eachItem.dueDate}</p>
</div>

<div className='flex justify-between'>
<button className='w-[70px] bg-gray-600 text-white rounded-md border-none' >edit</button>
<button className='p-2 bg-red-500 rounded-md border-none' onClick={() => handleDelete(eachItem.id)}>delete</button>
<button className='p-2 bg-green-500 rounded-md border-none text-white font-semibold'>download pdf</button>
</div>


      </div>
    ))
  }
  </section>
</section>
    

    </>
  )
}

export default App
