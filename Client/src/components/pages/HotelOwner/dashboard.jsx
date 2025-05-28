import React, { useState } from 'react'
import Title from '../../Title'
import { assets} from '../../../assets/assets'
import { UseAppContext } from '../../../Context/AppContext'
import { useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
const dashboard = () => {
    const {user,token}=UseAppContext();
    const [dashboarddata,setDashboarddata]=useState({
        bookings:[],
        totalBookings:0,
        totalRevenue:0
    });
    const fetchData = async () => {
  try {
    const { data } = await axios.get("/booking/hotel", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(data);
    if (data.success) {
      console.log(data.dashboardData);
      setDashboarddata(data.dashboarddata);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
}
         
          useEffect(()=>
         {
           if(user)
           {
             fetchData();
           }
         },[user])



  return (
    <>
    <div className='pt-10 ml-6'>
       <Title title="DashBoard" align="left" font="outfit"  subtitle="Monitor your room listing ,track boooking and analyze review all in one place .
       Stay updated with real time insight to ensure smooth operations."   />
    </div>
    <div className='flex flex-row ml-6 space-x-10  mt-6'>
         {/* total booking */}
         <div className='border-1 flex flex-row w-fit  rounded-lg px-2 py-2       border-gray-200 bg-gray-100'>
            <img src={assets.totalBookingIcon} alt="" />
            <div>
                <p className='text-blue-600'>Total Bookings</p>
                <p className='text-gray-600'>{dashboarddata.totalBookings}</p>
            </div>
         </div>
         {/* total revenue */}
         <div className='border-1 flex flex-row w-fit  rounded-lg px-2 py-2  border-gray-200 bg-gray-100'>
            <img src={assets.totalRevenueIcon} alt="" />
            <div>
                <p className='text-blue-600'>Total Revenue</p>
                <p className='text-gray-600'>{dashboarddata.totalRevenue}</p>
            </div>
         </div>
    </div>

    {/* Recent bookings */}

     <h2 className='text-gray-600 font-bold my-6 ml-6'>Recent Bookings</h2>
        <div className='my-6 ml-6'>
            <table>
                <thead className='bg-gray-200'>
                    <tr className='space-x-5'>
                        <th className='py-3 px-3'>Username</th>
                         <th className='py-3 px-3'>Room Name</th>
                          <th className='py-3 px-3'>Total Amount</th>
                           <th className='py-3 px-3'>Payment Status</th>
                    </tr>
                </thead>
                <tbody className='text-sm '>
                    {dashboarddata.bookings.map((item,index)=>(
                        <tr key={index}>
                           <td className='py-3 px-3 border-1 border-gray-200'>{item.user.username}</td>
                           <td className='py-3 px-3 border-1 border-gray-200'>{item.room.roomType}</td>
                           <td className='py-3 px-3 border-1 border-gray-200'>${item.totalPrice}</td>
                           <td className='py-3 px-3 border-1 border-gray-200'><button className={`${item.isPaid?'bg-green-500 text-green-950':'bg-amber-500 text-amber-900'} rounded-lg px-1 py-1 `}>{item.isPaid?"Completed":"Pending"}</button></td>  
                        </tr>

                    ))
                    }
                </tbody>
            </table>
        </div>




    </>
    
  )
}

export default dashboard
