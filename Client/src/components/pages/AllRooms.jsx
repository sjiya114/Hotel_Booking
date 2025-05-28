import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../../assets/assets'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseAppContext } from '../../Context/AppContext';

function CheckBox({heading,elements,value})
{
return(
<>
<div className='flex flex-col justify-between space-y-2'>
{elements.map((element,index)=>(
    <>
    <label key={index} htmlFor={value}>{element} <input type="checkbox" value={element} name={value} id={value} /></label>
    </>
))}
</div>
</>
)
}

function AllRooms() {
     const {rooms}=UseAppContext();
    const [searchParams,setSearchParams]=useSearchParams();
    const [selectedFilters,setSelectedFilters]=useState({
        rooms:[],
        priceRange:[],
    })
    const [selectedSort,setSelectedSort]=useState('');
    const nav=useNavigate();
    const popularfilters=["Single Bed","Family Suite","Double Bed","Luxury Room"];
    const price=["25000 to 5000","5000 to 8000","8000 to 15000"];
    const sortBy=["Price Low to High","Price HIgh to Low","Newest First"];
    const [openFilter,setOpenFilter] =useState(false);
   
    return (
        <div className='my-40 flex flex-row max-lg:flex-col-reverse justify-between ml-20 max-lg:ml-4'>
            <div>
                <div className={`flex flex-col items-left pb-4  `}>
                    <h1 className={`text-5xl font-PlayFair  text-black  `}>Hotel Rooms</h1>
                    <p className={`text-sm text-gray-500 w-2xl mt-6 max-lg:w-xs `}  >Take advantage of our limited time offers and special package to enhance your stay and create unforgettable memories</p>
                </div>
                <div className='flex flex-col space-y-10'>

                     {rooms.map((room,index)=>(
                    <div key={index}  className='space-x-6  flex flex-row max-sm:flex-col  '>
                         <img className='w-80 h-60 rounded-lg' src={room.images[0]} onClick={()=>{nav(`/room/${room._id}`)}} title='view room details'   alt="hotel-img" />
                          <div className='flex flex-col space-y-3'>
                            <div>
                            <p className='text-gray-700'>{room.hotel.city}</p>
                            <p>{room.hotel.name}</p>
                            <p>200+ reviews</p>
                         </div>
                         <div className='flex flex-row  space-x-2'>
                            <img src={assets.locationIcon} alt="" />
                            <span>{room.hotel.address}</span>
                         </div>
                         {/* room amenities */}
                         <div className='flex flex-row text-sm space-x-3 flex-wrap '>
                            {room.amenities.map((items)=>(
                              <div className='bg-gray-200 rounded-lg px-1 py-1 text-black'>
                                <img src={facilityIcons[items]} alt="item" className='w-5 h-5' />
                                 <p>{items}</p>
                              </div>
                            ))}
                         </div>
                          <p>{room.pricePerNight}/Night</p>
                    </div>
                        </div>  
                ))}
                </div>
            </div>

            {/* Filter */}
            <div  className='bg-white border-2 mr-10 max-lg:mb-6   flex flex-col space-y-6 border-gray-500 w-[300px] h-fit  text-gray-600'>
                <div className='text-xs px-4 py-4  cursor-pointer flex flex-row justify-between '>
                    <p className='text-gray-800 font-bold  text-base'>FILTER</p>
                    <span onClick={(e)=>{setOpenFilter(!openFilter)}} className='lg:hidden font-bold'>
                        {!openFilter?'HIDE':'SHOW'}
                    </span>
                    <span className='hidden font-bold lg:block'>
                        CLEAR
                    </span>
                </div>
                  {!openFilter && <hr className='bg-gray-600' />}
                 {!openFilter &&  <div className='flex flex-col space-y-6'>

                    <div className='flex  px-4 flex-col space-y-4'>
                     <h1 className='text-black font-bold'>PopularFilters</h1>
                    <CheckBox heading="popularfilters" elements={popularfilters} value="filter"/></div>
                  <div className='flex px-4 flex-col space-y-4'> <h1  className='text-black font-bold'>Price</h1>
                    <CheckBox heading="price" elements={price} value="price"/></div>
                 <div className='flex px-4 py-4 flex-col space-y-4'> <h1 className='text-black font-bold'  >SortBy</h1>
                    <CheckBox heading="sortBy" elements={sortBy} value="sortby"/></div>


                 </div>}
                
               </div>
            </div>
    )
}

export default AllRooms
