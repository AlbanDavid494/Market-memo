import React, {useState, useEffect} from 'react'
import {addItem, deleteItem, getItems, updateItem} from './db'


function App() {
  const [items, setItems] = useState([])
  const [itemName, setItemName] = useState('')
  const [proposedPrice, setProposedPrice] = useState('')
  const [actualPrice, setActualPrice] = useState(0)
  const [dueDate, setDueDate] = useState('')
  const [actualPriceTotal, setActualPriceTotal] = useState(0)
  const [proposedPriceTotal, setProposedPriceTotal] = useState(0)
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
    itemName, 
    proposedPrice : parseFloat(proposedPrice),
    actualPrice: parseFloat(actualPrice),
    dueDate
  };

// if(editingItem){
//   await updateItem({...itemData, id: editingItem})
//   setEditingItem(null)
// } else{
  await addItem(itemData)
// }

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

const actPriceTotal = items.reduce((acc, item) =>
  acc + item.actualPrice, 0)
// console.log(actPriceTotal)

// updating the proposePrice
useEffect(() => {
  const proPriceTotal = items.reduce((acc, item) => 
    acc + item.proposedPrice, 0
    )
    setProposedPriceTotal(proPriceTotal)
    console.log(proPriceTotal)
}, [items])


// handling done item (a toggle)
const handleOnChangeIsDone = async (id, event) => {
if(event.target.checked){
await updateItem(id, {isDone: true})
}else{
await updateItem(id, {isDone: false})
}
// refetch item to refresh the state
fetchItems()
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

<section className='flex justify-center items-center my-4'>

<div className='relative overflow-x-auto shadow-md rounded-md  sm:rounded-lg'>
<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
  <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
    <tr>
      <th scope='col' className='px-6 py-3 rounded-none'>Item name</th>
      <th className='px-6 py-3'>Actual price ($)</th>
      <th className='px-6 py-3'>Proposed price ($)</th> 
      <th className='px-6 py-3 text-red-600'>due date</th> 
      <th className='px-6 py-3 text-green-600'>done</th>
      <th className='px-6 py-3 '>action</th> 
      
    </tr>
  </thead>
  <tbody className=''>
    {
      items.map((item) => (
<tr key={item.id} className='bg-white border-b border-gray-200'>
  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap line-through'>{item.itemName}</th>
  <td className='px-6 py-4 line-through'>$ {item.actualPrice}</td>
  <td className='px-6 py-4 line-through'>${item.proposedPrice}</td>
  <td className={`px-6 py-4 ${item.isDone ? 'line-through' : ''}`}>{item.dueDate}</td>
  <td scope='col' className='p-4'>
    <div className='flex items-center px-4'>
      <input type="checkbox" id='checkbox-done' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2' checked={item.isDone} onChange={event => handleOnChangeIsDone(item.id, event)} />
      <label htmlFor="checkbox-done" className='sr-only'>checkbox</label>
    </div>
  </td>
  <td className='flex items-center px-6 py-4'>
{/* icon */}
<button className='font-medium text-blue-600 hover:underline'>Edit</button>
<button onClick={() => handleDelete(item.id)} className='font-medium text-red-600 hover:underline ms-3'>Delete</button>
  </td>
</tr>
      ))
    }
    
  </tbody>
  <tfoot>
    <tr className='font-semibold text-gray-900'>
      <th scope='row' className='text-base px-6 py-4'>Total:</th>
      <td className='px-6 py-4'>${actualPriceTotal}</td>
      <td className='px-6 py-4'>${proposedPriceTotal}</td>
    </tr>

  </tfoot>
</table>

<div className='flex justify-end'>
<button className='bg-green-600 text-gray-100 p-2 rounded-md shadow-md m-2 font-semibold text-sm'>Download PDF</button>
</div>

</div>
</section>


</section>
    

    </>
  )
}

export default App
