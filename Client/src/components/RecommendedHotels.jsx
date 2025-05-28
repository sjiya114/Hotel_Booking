import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useState,useEffect } from 'react'
import { UseAppContext } from '../Context/AppContext'
function RecommendedHotels() {
    const {rooms,user,searchedCities}=UseAppContext();
    const [recommended,setRecommended]=useState('');
    const filterhotels=()=>
    {
        const filteredone=rooms.slice().filter((room)=>{
            console.log(room);
            return searchedCities.includes(room.hotel.city);
    });
    console.log(filteredone);
    setRecommended(filteredone);
    }

    useEffect(()=>
    {
      filterhotels();
    },[user,searchedCities]);


  return recommended.length>0 && (
      <div className='flex flex-col'>
           <div>
               <Title title="Recommended Destination" align="center" subtitle="Discover over handpicked selection of exceptional properties around world,
               offering unparalledled luxury and unforgettable experience"  />
           </div>
          <div className='flex flex-row justify-evenly mt-20 flex-wrap px-[5vw]'>
         {recommended.slice(0,4).map((room,index)=>(
            <div key={index} className='mb-6'>
                 <HotelCard key={room._id} room={room} index={index}  />
            </div>
         ))}
      </div>
      <div className='flex mt-6 items-center justify-center'>
          <button className='text-black border-1 border-gray-500 rounded-lg cursor-pointer px-2 py-2 w-fit text-center'>View All Destinations</button>
      </div>
       
      </div>
     
  )
}

export default RecommendedHotels
