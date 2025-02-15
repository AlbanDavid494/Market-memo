import React, {useState, useEffect} from 'react'
import {addItem, deleteItem, getItems, updateItem, updateEditItem} from './db'
import Edit from './Components/Edit'
import EditModal from './Components/EditModal'
import { MdDelete } from "react-icons/md";


function App() {
  const [items, setItems] = useState([])
  const[refresh, setRefresh] = useState(false)
  const [itemData, setItemData] = useState({
    itemName: '',
    price: '',
    date: '',
    isDone: false
  })

  const [proposedPriceTotal, setProposedPriceTotal] = useState(parseFloat(0))
  const [editingItem, setEditingItem] = useState(null)
  const [editDetails, setEditDetails] = useState({})
  const [editDetailId, setEditDetailId] =useState('')
  
  // handling editing toggle
  const [isEditToggle, setIsEditToggle] = useState(false)

  const handleEditItem = (itemDetails, itemDetailsId) => {
    setIsEditToggle(!isEditToggle)
    setEditDetails(itemDetails)
    setEditDetailId(itemDetailsId)
  }


  const handleItemChange = (e) => {
    setItemData({...itemData, [e.target.name]: e.target.value})
  }



  const fetchItems = async () => {
    const allItems = await getItems();
    setItems(allItems)
  }

  // function to handle add items
const handleAddItems = async (event) => {
  event.preventDefault()
  // console.log(itemData)
 
await addItem(itemData)
setItemData({
  itemName: '',
  price: '',
  date: '',
  isDone: false
})
setRefresh(!refresh)
alert('item added!')
}

// function to handle delete items
const handleDelete = async (id) => {
  await deleteItem(id)
  alert("Item deleted!")
  // refresh the list after deleting
  fetchItems()
}




// updating the proposePrice
useEffect(() => {
  const proPriceTotal = items.reduce((acc, item) => 
    acc + parseFloat(item.price), 0
    )
    setProposedPriceTotal(proPriceTotal)
    // console.log(proPriceTotal)
}, [items])


// handling done item (a toggle)
const handleOnChangeIsDone = async (id, event) => {
if(event.target.checked){
await updateItem(id, {isDone: true})
alert('item done!')
}else{
await updateItem(id, {isDone: false})
alert("Item undone!")
}

fetchItems()
} 


useEffect(() => {
  fetchItems();
  // when components mounts fetch items
},[refresh])




  return (
    <section className='relative'>
    <h2 className='text-3xl m-4 font-semibold'>Market memo</h2>
    <p className='text-gray-600 font-mono ml-5 my-3'>Welome to Market memo , the ultimate shopping companion. <br />With Market memo, You can effortlessly create and manage your market lists, ensuring that you never forget an item again.</p>

    <section className='w-full flex justify-center items-center mt-2'>
     
<form  className='border max-w-sm w-full p-4 rounded-md shadow-lg mx-4 my-4' onSubmit={handleAddItems}>

<div className='block relative my-2'>
  <label htmlFor="title" className='pl-1'>Item name</label>
  <input type="text" value={itemData.itemName} name='itemName' onChange={handleItemChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='name of your item' required  />
</div>

<div className='block relative'>
  <label htmlFor="title" className='pl-1'>proposed amount $</label>
  <input type="number" name='price' value={itemData.price} onChange={handleItemChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='amount of your item' required />
</div>

{/* <div className='block relative my-2'>
  <label htmlFor="title" className='pl-1'>Quantity</label>
  <input type="number" value={quantity} onChange={handleQuantityOnChange} className='border w-full p-2 my-1 rounded-md outline-none' placeholder='quantity of your item' required  />
</div> */}

<div className='block relative my-2'>
  <label htmlFor="dueDate" className='pl-1'>Date for purchase</label>
  <input type="date" name='date' placeholder='Date for purchase' value={itemData.date} onChange={handleItemChange} id="dueDate" className='border w-full p-2 rounded-md my-1 outline-none' required/>
</div>



<div className='flex justify-center py-4'>

  <button className='bg-black text-white p-2 rounded-md shadow-lg'>add items</button>
</div>

</form>

    </section>

 {
  isEditToggle &&  <EditModal  setEditingItem={setEditingItem} isEditToggle={isEditToggle} editDetailId={editDetailId} editDetails={editDetails} setIsEditToggle={setIsEditToggle} fetchItems={fetchItems}/> 
  
 }   

{/* market list */}
<section>

<p className='font-mono pl-7 my-5 mx-6'>We've got you covered, here are your list 👇</p>
<p className='font-mono pl-7 my-5 mx-6'>smaller screens scroll left 👈</p>

<section className='flex justify-end'>
<div className='flex justify-between w-[600px] px-6 mt-2 mb-5'>
<p>Remaining List items: {items.length}</p>
</div>
</section>



<section className='flex justify-center items-center my-4'>

<div className='relative overflow-x-auto shadow-md rounded-md  sm:rounded-lg'>
<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
  <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
    <tr>
      <th scope='col' className='px-6 py-3 rounded-none'>Item name</th>
      {/* <th className='px-6 py-3'>Quantity</th> */}
      <th className='px-6 py-3'>Proposed price ($)</th> 
      <th className='px-6 py-3 text-red-600'>Date for purchase</th> 
      <th className='px-6 py-3 text-green-600'>done</th>
      <th className='px-6 py-3 '>action</th> 
      
    </tr>
  </thead>
  <tbody className=''>
    {
      items.map((item) => (
<tr key={item.id} className='bg-white border-b border-gray-200'>
  <th scope='row' className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${item.isDone ? 'line-through' : ''}`}>{item.itemName}</th>
  {/* <td className={`px-6 py-4 ${item.isDone ?'line-through' : ''}`}> {item.quantity}</td> */}
  <td className={`px-6 py-4 ${item.isDone ? 'line-through' : ''}`}>${item.price}</td>
  <td className={`px-6 py-4 ${item.isDone ? 'line-through' : ''}`}>{item.date}</td>
  <td scope='col' className='p-4'>
    <div className='flex items-center px-4'>
      <input type="checkbox" id='checkbox-done' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2' onChange={(event) => handleOnChangeIsDone(item.id, event)} />
      <label htmlFor="checkbox-done" className='sr-only'>checkbox</label>
    </div>
  </td>
  <td className='flex items-center px-6 py-4'>
{/* icon */}
<Edit handleOnClickToggle={() => handleEditItem(item, item.id)} />
<MdDelete onClick={() => handleDelete(item.id)} className='font-medium cursor-pointer text-2xl text-red-600 hover:underline ms-3' title='delete item'/>
  </td>
</tr>
      ))
    }
    
  </tbody>
  <tfoot>
    <tr className='font-semibold text-gray-900'>
      <th scope='row' className='text-base px-6 py-4'>Total:</th>
      {/* <td className='px-6 py-4'>{quantity}</td> */}
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
    

    </section>
  )
}

export default App
