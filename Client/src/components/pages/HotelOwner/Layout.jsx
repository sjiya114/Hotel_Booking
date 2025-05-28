import React, { useEffect } from 'react'
import Navbar from '../../hotelowner/Navbar'
import Sidebar from '../../hotelowner/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { UseAppContext } from '../../../Context/AppContext'

const Layout = () => {
  const {isOwner}=UseAppContext();
  const nav=useNavigate();
  useEffect(()=>
  {
  if(!isOwner)
  {
    nav("/");
  }
  },[isOwner])
  return (
    <div className='flex flex-col mb-10'>
        <Navbar/>
        <div className='flex  max-sm:flex-col'>
           <Sidebar/>
           <div>
            {/* To display all children within div we have imported outlet from react-router-dom */}
            <Outlet/>
           </div>
        </div>
       
    </div>
  )
}

export default Layout
