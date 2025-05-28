import React from 'react'
import { assets, cities } from '../assets/assets'
import { UseAppContext } from '../Context/AppContext'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Form() {
  const {searchedCities,setSearchedCities,token}=UseAppContext();
  const [destination,setDestination]=useState('');
  const nav=useNavigate();
  const onSearch=async(e)=>
  {
   e.preventDefault();
   let res=await axios.post("/user/recent-search",{recentSearch:destination},{
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
      console.log("hello response")
      console.log(res);
      if(res.data.success){
             nav(`/rooms?destination=${destination}`);
             
                  setSearchedCities((prevSearches)=>
      {
        const updatedSearch=[...prevSearches,destination];
        if(updatedSearch.length>3)
          updatedSearch.shift();
      return updatedSearch;
      })
      }
          }

  return (
    <>
       <form onSubmit={onSearch}   action=""  className='bg-white text-gray-500  mx-32  max-sm:mx-0  max-md:w-lg   max-lg:w-fit mt-10  max-w-fit rounded-lg'>
        <div className='flex flex-row flex-wrap max-md:flex-col space-y-5 max-md:px-6   rounded-3xl space-x-10 min-md:px-10 py-4'>
        <div>
            <div>
                <img src={assets.calenderIcon} alt="" />
               <label htmlFor="destination">Destination</label>
            </div>
          
          <input onChange={(e)=>{setDestination(e.target.value)}} type="text" list='destinationlist' className='border-1 border-gray-500' name='destination' placeholder='Type here' id='destination' />
            <datalist id='destinationlist'>
                {searchedCities.map((city,index)=>(
                    <option value={city} key={index}></option>
                ))}
            </datalist>
        </div>
        <div>
            <div>
                <img src={assets.calenderIcon} alt="" />
            <label htmlFor="checkin">Check In</label>
            </div>
           
          <input type="date" name='checkin' className='border-1 border-gray-500' placeholder='dd-mm-yyyy' id='checkin' />
        </div>
        <div>
            <div>
              <img src={assets.calenderIcon} alt="" />
            <label htmlFor="checkout">Check Out</label>
            </div>
           
          <input type="date" name='checkout' className='border-1 border-gray-500' placeholder='dd-mm-yyyy'  id='checkout' />
        </div>
        <div>  
          <label className='block' htmlFor="guests">Guests</label>
          <input type="number" name='guests' className='border-1 border-gray-500' placeholder='0' id='guests' />
        </div>
        <div>
            <button type='submit'  className='bg-black rounded-md px-2 py-2 text-white'   ><img src={assets.searchIcon} alt="" />Search</button>
        </div>
     </div>
       </form>
    
    
    
    
    
    </>
  )
}

export default Form
