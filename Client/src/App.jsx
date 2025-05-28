import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Home from './components/Home'
import { Route,Routes} from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Footer from './components/Footer'
import AllRooms from './components/pages/AllRooms'
import RoomDetails from './components/pages/RoomDetails'
import MyBookings from './components/pages/MyBookings'
import Hotelreg from './components/pages/Hotelreg'
import Layout from './components/pages/HotelOwner/Layout'
import Dashboard from './components/pages/HotelOwner/dashboard'
import Addroom from './components/pages/HotelOwner/Addroom'
import List from './components/pages/HotelOwner/List'
import {Toaster} from 'react-hot-toast';
import { UseAppContext } from './Context/AppContext'
function App() {
    const {showHotelReg}=UseAppContext(); 
    const location=useLocation();
    const isOwnername= location.pathname.includes("owner") || location.pathname.includes("login") || location.pathname.includes("signup")  ;

  return (
    <>
         <Toaster/>
         {!isOwnername && <Navbar/>}
          {showHotelReg  && <Hotelreg/>}
        <Routes>
        <Route path='/login' element={<Login/>}  ></Route>
        <Route path='/signup' element={<Signup/>}  ></Route>
        <Route path='/rooms' element={<AllRooms/>}  ></Route>
         <Route path='/owner' element={<Layout/>}  >
            <Route index element={<Dashboard/>} ></Route>
         <Route path='/owner/add' element={<Addroom/>} ></Route>
         <Route path='/owner/list' element={<List/>} ></Route>
         </Route>
        <Route path='/room/:id' element={<RoomDetails/>}  ></Route>
         <Route path="/" element={<Home/>}   />
          <Route path="/my-bookings" element= {<MyBookings/> }   />
       </Routes>
       {/* <div className='min-h-[70vh]'>
        <Routes>
         
        </Routes>
       </div> */}
       <Footer/>
      
    </>
  )
}

export default App
