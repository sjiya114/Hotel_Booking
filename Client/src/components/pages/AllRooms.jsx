import React, { useEffect, useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../../assets/assets'
import { Form, useNavigate, useSearchParams } from 'react-router-dom'
import { UseAppContext } from '../../Context/AppContext';

// function CheckBox({heading,elements,value})
// {
// return(
// <>
// <div className='flex flex-col justify-between space-y-2'>
// {elements.map((element,index)=>(
//     <>
//     <label key={index} htmlFor={value}>{element} <input type="checkbox" value={element} name={value} id={value} /></label>
//     </>
// ))}
// </div>
// </>
// )
// }

function AllRooms() {
    const { rooms } = UseAppContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isChecked,setChecked]=useState(false);
    const [selected,setSelected]=useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        room: [],
        priceRange: [],
        sortBy: ""
    })
    const nav = useNavigate();
    const [arr, setArr] = useState(rooms);
    const popularfilters = ["single-bed", "family-suites", "double-bed", "luxury-room"];
    const price = ["0 to 5000", "5000 to 8000", "8000 to 15000"];
    const sortBy = ["Price Low to High", "Price High to Low", "Newest First"];
    const [openFilter, setOpenFilter] = useState(false);

    const applyRoomTypeFilter = (typeofroom) => {
        const arrs = rooms.filter((room) => {
            return typeofroom.includes(room.roomType)
        });
        setArr(arrs);
    }
    const applySortByFilter = (sortType) => {
        let result=[]
        if(sortType===("Price Low to High")) {
          result=[...arr].sort((a,b)=>(Number(a.pricePerNight)-Number(b.pricePerNight)));
         }
         else if(sortType===("Price High to Low"))
         {
          result=[...arr].sort((a,b)=>(Number(b.pricePerNight)-Number(a.pricePerNight)));  
         }
         else
         {
        result=[...arr].sort((a,b)=>(new Date(b.createdAt)-new Date(a.createdAt))); 
         }
         setArr(result);
    }
    const applyFilterByPrice = (priceArray) => {
        const arrs = [];
        if (priceArray.includes("0 to 5000")) {
            arr.map((elements) => {
                if (elements.pricePerNight >= 0 && elements.pricePerNight < 5000 && !arrs.includes(elements)) {
                    arrs.push(elements);
                }
            })
        }
        if (priceArray.includes("5000 to 8000")) {
            arr.map((elements) => {
                if (elements.pricePerNight >= 5000 && elements.pricePerNight < 8000 && !arrs.includes(elements)) {
                    arrs.push(elements);
                }
            })
        }
        if (priceArray.includes("8000 to 15000")) {
            arr.map((elements) => {
                if (elements.pricePerNight >= 8000 && elements.pricePerNight < 15000 && !arrs.includes(elements)) {
                    arrs.push(elements);
                }
            })
        }
        setArr(arrs);
    }
    const onFilterHandler = (e) => {
        e.preventDefault();
        console.log(selectedFilters);
        if (selectedFilters.room.length > 0)
            applyRoomTypeFilter(selectedFilters.room);
        if (selectedFilters.priceRange.length > 0)
            applyFilterByPrice(selectedFilters.priceRange);
        if(selectedFilters.sortBy.length>0)
        applySortByFilter(selectedFilters.sortBy);
    }
    const clearFilter = (e) => {
        e.preventDefault();
        
        setArr(rooms);
        setSelectedFilters({
            room: [],
            priceRange: [],
            sortBy: ""
        });
    }
    return (
        <div className='my-40 flex flex-row max-lg:flex-col-reverse justify-between ml-20 max-lg:ml-4'>
            <div>
                <div className={`flex flex-col items-left pb-4  `}>
                    <h1 className={`text-5xl font-PlayFair  text-black  `}>Hotel Rooms</h1>
                    <p className={`text-sm text-gray-500 w-2xl mt-6 max-lg:w-xs `}  >Take advantage of our limited time offers and special package to enhance your stay and create unforgettable memories</p>
                </div>
                <div className='flex flex-col space-y-10'>

                    {arr.map((room, index) => (
                        <div key={index} className='space-x-6  flex flex-row max-sm:flex-col  '>
                            <img className='w-80 h-60 rounded-lg' src={room.images[0]} onClick={() => { nav(`/room/${room._id}`) }} title='view room details' alt="hotel-img" />
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
                                    {room.amenities.map((items) => (
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
            <div className='bg-white border-2 mr-10 max-lg:mb-6   flex flex-col space-y-6 border-gray-500 w-[300px] h-fit  text-gray-600'>
                <div className='text-xs px-4 py-4  cursor-pointer flex flex-row justify-between '>
                    <p className='text-gray-800 font-bold  text-base' onClick={onFilterHandler}   >FILTER</p>
                    <span onClick={(e) => { setOpenFilter(!openFilter) }} className='lg:hidden font-bold'>
                        {!openFilter ? 'HIDE' : 'SHOW'}
                    </span>
                    <span onClick={clearFilter} className='hidden font-bold lg:block'>
                        CLEAR
                    </span>
                </div>
                {!openFilter && <hr className='bg-gray-600' />}
                {!openFilter && <div className='flex flex-col space-y-6'>

                    <div className='flex  px-4 flex-col space-y-4'>
                        <h1 className='text-black font-bold'>PopularFilters</h1>
                        <div className='flex flex-col justify-between space-y-2'>
                            {popularfilters.map((element, index) => (
                                <>
                                    <label key={index} htmlFor="filter">{element} <input type="checkbox"
                                        onChange={(e) => {
                                            if (!selectedFilters.room.includes(e.target.value)) {
                                                selectedFilters.room.push(e.target.value);
                                            }
                                            else {
                                                selectedFilters.room.splice(selectedFilters.room.indexOf(e.target.value));
                                            }
                                        }}
                                        value={element} name="filter" id="filter" /></label>
                                </>
                            ))}
                        </div>
                        {/* <CheckBox heading="popularfilters" elements={popularfilters} value="filter"/> */}</div>
                    <div className='flex px-4 flex-col space-y-4'> <h1 className='text-black font-bold'>Price</h1>
                        <div className='flex flex-col justify-between space-y-2'>
                            {price.map((element, index) => (
                                <>
                                    <label key={index} htmlFor="price">{element} <input type="checkbox"
                                        onChange={(e) => {
                                            if (!selectedFilters.priceRange.includes(e.target.value)) {
                                                selectedFilters.priceRange.push(e.target.value);
                                            }
                                            else {
                                                selectedFilters.priceRange.splice(selectedFilters.priceRange.indexOf(e.target.value));
                                            }
                                        }}
                                        value={element} name="price" id="price" /></label>
                                </>
                            ))}
                        </div>
                        {/* <CheckBox heading="price" elements={price} value="price"/> */}</div>
                    <div className='flex px-4 py-4 flex-col space-y-4'> <h1 className='text-black font-bold'  >SortBy</h1>
                        <div className='flex flex-col justify-between space-y-2'>
                            {sortBy.map((element, index) => (
                                <>
                                    <label key={index} htmlFor="sortBy">{element} <input type="radio"
                                        onChange={(e) => { setSelectedFilters({ ...selectedFilters, [e.target.name]: e.target.value })}}
                                        value={element} name="sortBy" id="sortBy"   /></label>
                                </>
                            ))}
                        </div>
                        {/* <CheckBox heading="sortBy" elements={sortBy} value="sortby"/> */}</div>


                </div>}

            </div>
        </div>
    )
}

export default AllRooms
