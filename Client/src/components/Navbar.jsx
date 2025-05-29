import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom';
import { UseAppContext } from '../Context/AppContext.jsx';
import { Link } from 'react-router-dom';
function Navbar() {
    const [open, setOpen] = useState(false);
    const { setShowHotelReg, user,setUser,setToken,isOwner } = UseAppContext();
    const [isopen, setIsopen] = useState(false);
     const handleLogout=()=>
     {
      setUser("");
      setToken("");
      localStorage.clear("user");
      localStorage.clear("token");
     }


    const nav = useNavigate();
    return (
        <>
            {/* fixed for navbar stickness on top */}
            <nav className="w-screen  top-0  h-20 bg-blue-950 fixed">
                <div className={`flex flex-row ${!open && 'px-8'} justify-between ${!open && 'pt-4'}  min:md:px-20`}>
                    <div className='min:md:w-[30%]'>
                        <img src={assets.logo}></img>
                    </div>
                    <div>
                        <img onClick={(e) => { setOpen(!open) }} className='hidden max-sm:block pt-3' src={assets.menuIcon} alt="" />
                    </div>
                    {open && <div className='absolute flex bg-white flex-col w-screen h-screen'>
                        <div>
                            <img onClick={(e) => { setOpen(!open) }} className='hidden  max-sm:block pt-3 ml-[95%] pr-10 ' src={assets.closeIcon} alt="" />
                        </div>
                        <div className='flex flex-col text-black pt-20 text-center space-y-4'>
                            <div> <Link to='/' className='hover:underline'> Home</Link></div>
                            <div> <Link className='hover:underline' to="/login">Hotels</Link></div>
                            <div><Link className='hover:underline'>Experience</Link></div>
                            <div><Link className='hover:underline'>About</Link></div>
                            {user &&  <div> <Link  onClick={()=>{!isOwner?setShowHotelReg(true):nav("/owner")}}       className='border-1 border-white px-2 py-2 rounded-2xl'>{isOwner ? 'Dashboard' : 'List Your Hotels'}</Link></div>}
                            <div>
                                {!localStorage.getItem("token") && <div className='flex justify-center items-center flex-row min-md:space-x-10'>
                                    <img src={assets.searchIcon} ></img>
                                    <button className='text-white px-4 py-2 bg-black rounded-2xl  cursor-pointer'><Link to="/login">Login</Link></button>
                                </div>}
                                {localStorage.getItem("token") && <div className='flex flex-col  min-md:space-x-10'>
                                    <div className='flex justify-center items-center  ' >
                                        <div>
                                             <p><button onClick={(e) => { setIsopen(!isopen) }} className='text-white px-4 py-2  bg-black rounded-2xl  cursor-pointer'><img src={assets.userIcon} alt="" /><span>LogOut</span></button></p>
                                        </div>
                                    </div>
                                    <div>
                                        {isopen &&
                                            <div className='text-white mx-[35vw] bg-black flex flex-col  px-2 py-2 rounded-lg    shadow-2xs shadow-white'>
                                                <div><Link className='hover:underline'> <button onClick={()=>nav("/my-bookings")}   >My Bookings</button></Link></div>
                                                <div><Link className='hover:underline  cursor-pointer ' > <button className='cursor-pointer'  onClick={()=>handleLogout} >LogOut</button></Link></div>
                                            </div>
                                        }
                                    </div>

                                </div>}

                            </div>





                        </div>

                    </div>
                    }

                    <div className='flex flex-row justify-between min-md:w-[70%] max-sm:hidden'>
                        <div className='flex flex-row text-white pt-2  min-md:space-x-6'>
                            <div> <Link href='/' className='hover:underline'>Home</Link></div>
                            <div> <Link href='/rooms' className='hover:underline'>Hotels</Link></div>
                            <div><Link className='hover:underline'>Experience</Link></div>
                            <div><Link className='hover:underline'>About</Link></div>
                            {user && <div> <Link  onClick={()=>{!isOwner?setShowHotelReg(true):nav("/owner")}} className='border-1 border-white px-2 py-2 rounded-2xl'>{isOwner ? 'Dashboard' : 'List Your Hotels'}</Link></div>}
                        </div>
                        {!localStorage.getItem("token") && <div className='flex flex-row  min-md:space-x-10'>
                            <img src={assets.searchIcon} ></img>
                            <button className='text-white px-4 py-2 bg-black rounded-2xl cursor-pointer'><Link href='/login'>Login</Link></button>
                        </div>}
                        {localStorage.getItem("token") && <div className='flex flex-row  min-md:space-x-10'>
                            <div>
                                <p><button onClick={(e) => { setIsopen(!isopen) }} className='text-white flex flex-row px-4 py-2 bg-black rounded-2xl cursor-pointer'><img src={assets.userIcon} alt="" /><span>LogOut</span></button></p>
                                {isopen &&
                                    <div className='text-black bg-white flex flex-col px-2 py-2 rounded-lg    shadow-2xs shadow-white'>
                                        <div><Link className='hover:underline'> <button onClick={()=>nav("/my-bookings")}>My Bookings</button></Link></div>
                                        <div><Link className='hover:underline cursor-pointer'   > <button onClick={handleLogout}>LogOut</button></Link></div>
                                    </div>
                                }
                            </div>

                        </div>}

                    </div>


                </div>
            </nav>
        </>
    )
}

export default Navbar
