import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { UseAppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';
function FeaturedDestination() {
    const {rooms}=UseAppContext();
    const nav=useNavigate();
  return rooms.length>0 && (
      <div className='flex flex-col'>
           <div>
               <Title title="Featured Destination" align="center" subtitle="Discover over handpicked selection of exceptional properties around world,
               offering unparalledled luxury and unforgettable experience"  />
           </div>
          <div className='flex flex-row justify-evenly mt-20 flex-wrap px-[5vw]'>
         {rooms.slice(0,4).map((room,index)=>(
            <div key={index} className='mb-6'>
                 <HotelCard key={room._id} room={room} index={index}  />
            </div>
         ))}
      </div>
      <div className='flex mt-6 items-center justify-center'>
          <button onClick={()=>{nav("/rooms");scrollTo(0,0)}} className='text-black border-1 border-gray-500 rounded-lg cursor-pointer px-2 py-2 w-fit text-center'>View All Destinations</button>
      </div>
       
      </div>
     
  )
}

export default FeaturedDestination
