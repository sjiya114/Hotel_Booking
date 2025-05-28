import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
function Sidebar() {
  return (
   <>
    <div className="flex flex-col  w-[14vw] max-xl:w-[18vw] max-lg:w-[28vw] max-md:w-[36vw]  max-sm:flex-row  max-sm:w-full max-sm:h-20 max-sm:border-0 max-sm:flex-wrap max-sm:py-2    h-screen  mt-20 py-10 border-r-2 border-gray-600  text-gray-500 font-bold">
        <div className='px-6 py-10 hover:bg-blue-300 hover:text-blue-800 active:bg-blue-300 active:text-blue-300  ' >
            <Link to='/owner' className='flex flex-row space-x-4'>
            <img src={assets.dashboardIcon} alt="dashboard"></img>
            <p>DashBoard</p>
            </Link>
        </div>
         <div className='px-6 py-10 hover:bg-blue-300 hover:text-blue-800   active:bg-blue-300 active:text-blue-300 ' >
            <Link to='/owner/add'  className='flex flex-row space-x-4'>
            <img src={assets.addIcon} alt="addicon"></img>
            <p>AddRoom</p>
            </Link>
        </div>
            <div className='px-6 py-10 hover:bg-blue-300 hover:text-blue-800  active:bg-blue-300 active:text-blue-300   ' >
            <Link to="/owner/list"  className='flex flex-row space-x-4'>
            <img src={assets.listIcon} alt="listicon"></img>
            <p>ListRoom</p>
            </Link>
        </div>
    </div>
   </>
  )
}

export default Sidebar
