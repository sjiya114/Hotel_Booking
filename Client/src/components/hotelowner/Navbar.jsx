import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import { UseAppContext } from '../../Context/AppContext';
function Navbar() {
    const {setUser,setToken}=UseAppContext();
    const [isopen,setIsopen]=useState(false);
    const nav=useNavigate();
      const handleLogout=()=>
     {
      setUser("");
      setToken("");
      localStorage.clear("user");
      localStorage.clear("token");
     }

    return (
        <nav className="w-screen  top-0  h-20 bg-blue-950 fixed">
            <div className='flex flex-row justify-between'>
                <div className='min:md:w-[30%] mt-5 ml-5'>
                   <a href='/'> <img  src={assets.logo}></img></a>
                </div>
                <div className='mx-5 my-5'>
                {!localStorage.getItem("token") &&  <div className='flex flex-row  min-md:space-x-10'>
                                            <img src={assets.searchIcon} ></img>
                                            <button  className='text-white px-4 py-2 bg-black rounded-2xl cursor-pointer'><a href='/login'>Login</a></button>
                                       </div>}   
                                       {localStorage.getItem("token") &&   <div className='flex flex-row  min-md:space-x-10'>
                                            <div>
                                             <p><button onClick={(e)=>{setIsopen(!isopen)}}  className='text-white flex flex-row px-4 py-2 bg-black rounded-2xl cursor-pointer'><img src={assets.userIcon} alt="" /><span>LogOut</span></button></p>
                                               {/* { isopen && 
                                            <div className='text-black bg-white flex flex-col px-2 py-2 rounded-lg    shadow-2xs shadow-white'>
                                                <div><a className='hover:underline'> <button onClick={(e)=>{nav("/my-bookings")}}>My Bookings</button></a></div>
                                                <div><a className='hover:underline'       > <button>LogOut</button></a> */}
                                                 {isopen &&
                                            <div className='text-white bg-black flex flex-col px-2 py-2 rounded-lg    shadow-2xs shadow-white'>
                                                <div><a className='hover:underline'> <button onClick={()=>nav("/my-bookings")}   >My Bookings</button></a></div>
                                                <div><a className='hover:underline  cursor-pointer ' > <button className='cursor-pointer'  onClick={()=>{handleLogout()}} >LogOut</button></a></div>
                                            </div>
                                        }
                                                
                                                </div>
                                            </div>}
                                            </div>
                                        
                                        </div>
               
        </nav>
    )
}

export default Navbar
