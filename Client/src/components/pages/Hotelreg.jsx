import React, { useState } from 'react'
import {assets, cities} from '../../assets/assets'
import { UseAppContext } from '../../Context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
function Hotelreg() {
   const {setShowHotelReg,token,setIsOwner}=UseAppContext();
   const [data,setData]=useState({
    name:"",address:"",contact:0,city:""
   })
   
     const onChangeHandler=(e)=>
    {
       setData({...data,[e.target.name]:e.target.value});
    };
   
     const handlesubmit=async(e)=>
    {
       e.preventDefault();
    const formData = {
      name:data.name,address:data.address,contact:(Number)(data.contact),city:data.city
    };
    // console.log(formData);
      const response=await axios.post("/hotel/register",formData, { headers: {   Authorization: `Bearer ${token}` }  });
      if(response.data.success) 
        {
               toast.success(response.data.message);
               setShowHotelReg(false);
               setIsOwner(true);
                setData({
                 name:"",address:"",contact:0,city:""

                });
              navigate("/");
           }
           else{
              toast.error(response.data.error);
           }
        }




  return (
    <>
     <div className=' top-0 left-0 bottom-0 right-0  z-100 flex  items-center justify-center fixed bg-black/70 '>
      <form onSubmit={handlesubmit} className='flex max-md:flex-col ' action="">
       <img src={assets.regImage} className='w-1/2  hidden md:block rounded-md' alt="reg_image" />
        <div className='bg-white rounded-lg px-2 py-2  md:w-[50%] relative flex flex-col items-center  '>
            <img src={assets.closeIcon}  onClick={()=>{setShowHotelReg(false)}}   className='w-5 h-5   top-4 right-4 absolute' alt="" />
            <p className='text-black py-10   text-3xl font-bold'>Register Your Hotel</p>     
              

            <div>
              <label htmlFor="name" className='block  font-bold text-gray-600 '>HotelName</label>
              <input value={data.name} onChange={onChangeHandler}  className='border-2 px-2 py-1 mb-4  w-full border-gray-400 rounded-md mt-4'  placeholder='Type here' name='name'   type="text" required /></div>
            <div> 
               <label htmlFor="contact"  className='block font-bold text-gray-600 '>Phone Number</label>
              <input  value={data.contact}  onChange={onChangeHandler}  className='border-2 px-2 py-1  mb-4  w-full border-gray-400 rounded-md mt-4' placeholder='Type here' name='contact' type="text" required /></div>
            <div> 
               <label htmlFor="address"  className='block font-bold text-gray-600'>Address</label>
              <input value={data.address} onChange={onChangeHandler}  className='border-2 px-2 py-1  w-full mb-4 border-gray-400 rounded-md mt-4'  placeholder='Type here' type="text" name='address' required/></div>
             
                <div>
              <label htmlFor="city"  className='block font-bold text-gray-600 '>Select City</label>
               <select  id='city'  onChange={onChangeHandler}  value={data.city} className='border-2 px-2 py-1 w-full border-gray-400 rounded-md mt-4' name='city'>
                  <option className='text-black'    value="London" >London</option>
                   <option className='text-black' value="Paris" >Paris</option>
                    <option className='text-black' value="Switzerland" >Switzerland</option>
              </select> 
                </div>
             <div className='my-4'>
              <button type='submit' className='bg-blue-600 text-center w-full  rounded-md px-4 py-2 text-white hover:bg-purple-600 hover:text-white'>Register</button>
            </div>









        </div>
      </form>
    </div>

    </>
   
  )
}

export default Hotelreg
