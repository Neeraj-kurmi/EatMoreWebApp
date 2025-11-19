import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className='flex items-center gap-2'    >
          <div className= " border-3 border-gray-300 border-b-black animate-spin h-5 w-5 rounded-full"></div>
          <span className=' text-gray-500'>Loading...</span>
    </div>
  )
}

export default Loader