import React, { useEffect } from 'react'
import Title from '../Title'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { UseAppContext } from '../../Context/AppContext'
import axios from 'axios';

const MyBookings = () => {
    const {user,token}=UseAppContext();
    const [bookings, setBookings] = useState([]);
   const fetchBookings = async () => {
    try {
        console.log("hello");
        const { data } = await axios.get("/booking/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        if (data.success) {
            setBookings(data.booking);
        } else {
            toast.error("Error while fetching booking");
        }
    } catch (error) {
        toast.error(error.message || "Something went wrong");
    }
};

    useEffect(()=>
    {
   if(user)
   {
    fetchBookings();
   }
    },[user,bookings])
    return (
        <>
            <div className='my-30  max-w-sm:mx-2  mx-20 max-lg:mx-10    space-y-5'>
                <Title title="My Bookings" subtitle="Easily mange your past,current and upcoming hotel reservations in one place.Plan your
        trips seamlessly with just a few clicks"   align="left" />
                <div>

                    <div className='flex flex-row justify-between max-md:hidden border-b-1 border-gray-600 pb-2'>

                        <div>Hotels</div>
                        <div>Dates and Timing</div>
                        <div>Payment</div>


                    </div>
                    {bookings.map((booking, index) => (
                        <div key={index} className=' flex flex-row max-md:flex-col py-6   border-b-2 border-gray-500 my-6 justify-between'>
                            {/* information */}
                            <div>
                                <img className='w-80 h-60 rounded-lg' src={booking.room.images[0]} alt="" />
                                <div>
                                    <div className='flex items-center space-x-4'>
                                        <p className='font-playfair text-black'>{booking.room.hotel.name}</p>
                                        <span className='text-black pt-2'>({booking.room.roomType})</span>

                                    </div>

                                    <div className='flex flex-row space-x-2'>
                                        <img src={assets.locationIcon} alt="" />
                                        <span className='text-gray-700'>{booking.hotel.address}</span>
                                    </div>
                                    <div className='flex flex-row space-x-2'>
                                        <img src={assets.guestsIcon} alt="" />
                                        <span className='text-gray-700'>Guests:{booking.guests}</span>
                                    </div>
                                    <div className='flex flex-row space-x-2'>
                                        <p className='text-gray-700'>Total:${booking.totalPrice}</p>
                                    </div>

                                </div>

                            </div >
                            {/* checkin checkout */}
                            <div className='min-lg:mr-40'>
                                <div className='flex flex-row max-md:flex-col space-y-2 space-x-4'>
                                <div className='flex flex-col space-y-2'>
                                 <p className='text-gray-700'>Check-In:</p>
                                <p className='text-gray-700'>{new Date(booking.checkInDate).toDateString()}</p>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <p className='text-gray-700'>Check-Out:</p>
                                <p className='text-gray-700'>{new Date(booking.checkOutDate).toDateString()}</p>
                            </div>
                           

                            </div>
                            </div>
                            
                            {/* payment status */}
                            <div>
                                <div className='flex flex-row space-x-2'>
                                    <div className={`${booking.isPaid?'bg-green-900':'bg-red-800'} mt-2 rounded-full w-2 h-2 `}>

                                    </div>
                                    <p className={`${booking.isPaid?'text-green-900':'text-red-800'}`}  > {booking.isPaid?"Paid":"Unpaid"}   </p>

                                </div>
                               {!booking.isPaid && <button className='border-2 border-gray-500 text-gray-800 rounded-lg px-1 py-1'>Pay Now</button>}
                            </div>

                        </div>

                    ))
                    }


                </div>




            </div>

        </>
    )
}

export default MyBookings
