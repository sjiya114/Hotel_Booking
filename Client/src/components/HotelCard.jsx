import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
function HotelCard({room,index}) {
  return (
    <>
     <Link  to={'/room/'+room._id} onClick={scrollTo(0,0)}  key={room._id}   alt="" >
      {index%2===0 && <p className='absolute mt-50 px-2 py-2 text-white bg-red-900 rounded-3xl'>Best Seller</p>}
       <img className='w-80 h-60 rounded-lg' src={room.images[0]} alt="" />
       <div>
        <div className='flex items-center space-x-4'>
            <p className='font-playfair font-medium text-black'>{room.hotel.name}</p>
            <div className='flex items-center gap-1'>
            <img className='text-gray-700' src={assets.starIconFilled} alt="" />4.5
            </div>
        </div>
        <div>
            <img src={assets.locationIcon} alt="" />
            <span className='text-gray-700'>{room.hotel.address}</span>
        </div>
          <div className='flex flex-row space-x-6'>
            <p className='text-black pt-2'>${room.pricePerNight} <span className='text-gray-700 pt-2'>/night</span></p>
            <button className='border-1 border-gray-400 text-gray-700 px-2 py-2 rounded-lg'>Book Now</button>
          </div>
       </div>
     </Link>
    </>
  )
}

export default HotelCard
