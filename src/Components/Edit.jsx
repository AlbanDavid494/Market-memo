import React, { useEffect } from 'react'
import { updateEditItem } from '../db'
import { CiEdit } from "react-icons/ci";


const Edit = ({handleOnClickToggle}) => {

    

  return (
    <div>
        {/* onClick={() => handleEdit(item.id)} */}
      <CiEdit title='edit items' onClick={handleOnClickToggle} className='font-medium text-2xl cursor-pointer text-blue-600 hover:underline'/>
    </div>
  )
}

export default Edit
