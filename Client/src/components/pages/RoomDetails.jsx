import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, facilityIcons} from '../../assets/assets';
import { UseAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';


function RoomDetails() {
      const {rooms,token}=UseAppContext();
    const { id } = useParams();
    const nav=useNavigate();
    const [room, setRoom] = useState(null);
  
    const [checkIn,setCheckIn]=useState(null);
    const [checkOut,setCheckOut]=useState(null);
    const [guests,setGuests]=useState(0);
    const [mainImage, setMainImage] = useState(null);
    const [isAvailable,setIsAvailable]=useState(false);

     //check for room availability
     const checkAvailability=async()=>
     {
      try {
        if(checkOut<=checkIn)
        {
            toast.error("checkIn date should be less than check out date");
        }
        const res=await axios.post("/booking/checkavailability",{room:id,checkInDate:checkIn,checkOutDate:checkOut},{
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
        if(res.data.success)
        {
            if(res.data.available){
               setIsAvailable(true);
               toast.success("room is available");
            }
            else
            {
                setIsAvailable(false);
                toast.error("room is not available");
            }
           
        }
      } catch (error) {
           toast.error(error.message || "Something went wrong");
      }
     }


      const onSubmitHandler=async(e)=>
      {
        e.preventDefault();
        console.log(checkIn+" "+checkOut+" "+guests);
        if(!isAvailable)
        {
            return checkAvailability();
        }
        console.log("heyy");
        let res=await axios.post("/booking/book",{room:id,checkInDate:checkIn,checkOutDate:checkOut,guests:guests},{
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });
        if(res.data.success)
        {
           toast.success("room booked successfully");
           nav("/my-booking");
           scrollTo(0,0);
        }
        else
        {
            toast.error("error while booking room");
        }

      }









    useEffect(() => {
        const room = rooms.find(element =>
            element._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, []);
    return room && (
        <>
            <div className='px-4 my-28 mx-20 max-sm:mx-4'>
                <div className='flex flex-row space-x-4'>
                    <h1 className='font-PlayFair'>{room.hotel.name}<span>({room.roomType})</span></h1>
                    <button className='rounded-lg px-2 py-1 text-white bg-orange-400'>20% off</button>
                </div>
                <div>
                    <p>200+ views</p>
                </div>
                <div className='flex flex-row space-x-2'>
                    <img src={assets.locationIcon} alt="" />
                    <span className='text-gray-600'>{room.hotel.address}</span>
                </div>
                <div className='flex max-lg:flex-col flex-row space-x-20 space-y-6'>
                    <div>
                        <img src={mainImage} className='w-[40vw] h-[40vh] max-lg:w-[36vw]  max-sm:w-[100%] max-sm:h-[90%]   max-lg:h-[40vh] rounded-lg' alt="" />
                    </div>
                    <div className='flex flex-row flex-wrap max-sm:flex-col  space-y-4 space-x-10'>
                        {room.images.length > 1 && room.images.map((image) => (
                            <div>
                                <img src={image} onClick={(e) => { setMainImage(image) }} className='w-[20vw] h-[24vh] max-lg:w-[36vw] hover:border-orange-500 hover:border-2  max-sm:w-[80%] max-sm:h-[70%]   max-lg:h-[40vh] rounded-lg' alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row justify-between mt-4'>
                    <h1 className='text-black font-PlarFair text-3xl'>Experience Luxury like never before</h1>
                    <p>${room.pricePerNight}/night</p>
                </div>
                <div className='flex flex-row justify-baseline space-x-4 mt-2'>
                    {room.amenities.map((items) => (
                        <div className='bg-gray-200 rounded-lg px-1 py-1 text-black'>
                            <img src={facilityIcons[items]} alt="item" className='w-5 h-5' />
                            <p>{items}</p>
                        </div>
                    ))}
                </div>
                {/* checkout */}
                <form className='mt-16' onSubmit={onSubmitHandler} action="  ">
                     <div className='flex bg-white shadow-gray-600 shadow-2xl flex-row flex-wrap max-md:flex-col space-y-5 max-md:px-6   rounded-3xl space-x-10 min-md:px-10 py-4'>
                    <div>
            <div>
                <img src={assets.calenderIcon} alt="" />
            <label htmlFor="checkin">Check In</label>
            </div>
           
          <input  onChange={(e)=>{setCheckIn(e.target.value)}}  min={ new Date().toISOString().split("T")[0]}    type="date" name='checkin' className='border-1 border-gray-500' placeholder='dd-mm-yyyy' id='checkin' />
        </div>
        <div>
            <div>
              <img src={assets.calenderIcon} alt="" />
            <label htmlFor="checkout">Check Out</label>
            </div>
           
          <input type="date" onChange={(e)=>{setCheckOut(e.target.value)}} min={checkIn} disabled={!checkIn}  name='checkout' className='border-1 border-gray-500' placeholder='dd-mm-yyyy'  id='checkout' />
        </div>
        <div>  
          <label className='block' htmlFor="guests">Guests</label>
          <input type="number"  onChange={(e)=>{setGuests(e.target.value)}}  name='guests' className='border-1 border-gray-500' placeholder='0' id='guests' />
        </div>
        <div>
            <button type='submit' className='bg-blue-950 rounded-md px-2 flex flex-row space-x-4 py-2 text-white'   ><img src={assets.searchIcon} alt="" />{isAvailable?"Book Now":"Check Availability"}</button>
        </div>
        </div>
          </form>
          {/* <div className='mt-6 space-y-3.5'>
            {room.map((spec,index)=>(
              <div>
                  <img src={spec.icon} className='w-6' alt="" />
                  <div>
                    <p>{spec.title}</p>
                    <p>{spec.description}</p>
                  </div>
            </div>
           )) }
            
          </div> */}
          <div className='text-gray-500 mt-10 py-20 border-y-2 border-gray-500'>
            <p>Guest will be allocated on ground floor according to availability .You get a two bedroom  apartment has a true city feeling.
                The price quoted is for two guest,at guest slot please mark number of guest to get exact proce for group.The guest will be allocated ground floor acccording to availability.
                You get a two bedroom  apartment has a true city feeling.
            </p>
          </div>
            </div>
        </>
    )
}

export default RoomDetails
