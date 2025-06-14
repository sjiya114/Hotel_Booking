import React, { useState } from 'react'
import Title from '../../Title';
import { UseAppContext } from '../../../Context/AppContext';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const List = () => {
    const {token,user}=UseAppContext();
     const [rooms,setRooms]=useState([]);
     const fetchData = async () => {
             try {
     
                 const { data } = await axios.get("/rooms/gethotelroom", {
                     headers: {
                         Authorization:
                             `Bearer ${token}`
                     }
                 });
                 if (data.success) {
                     setRooms(data.rooms);
                  
                 }
                 else {
                    toast.error("error while getting list data");
                 }
     
             } catch (error) {
                  toast.error(error.message || "Something went wrong");
             }
     
         }
         const toggleavailability=async(roomId)=>
         {
             const { data } = await axios.post("/rooms/availability",{id:roomId}, {
                     headers: {
                         Authorization:
                             `Bearer ${token}`
                     }
                 });
                 if(data.success)
                 {
                    toast.success(data.message);
                    fetchData();
                 }
                 else
                 {
                    toast.error(data.error);
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
    <div>
    <div className='pt-10 ml-6'>
       <Title title="Room Listings" align="left" font="outfit"  subtitle="View,edit or manage alll listed rooms.Keep the information up to date to provide best experience for users"   />
    </div>
       <h2 className='text-gray-600 font-bold my-6 ml-6'>All Rooms</h2>
        <div className='my-6 ml-6'>
            <table>
                <thead className='bg-gray-200'>
                    <tr className='space-x-5'>
                        <th className='py-3 px-3'>Name</th>
                         <th className='py-3 px-3'>Facility</th>
                          <th className='py-3 px-3'>Price per Night</th>
                           <th className='py-3 px-3'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-sm '>
                    {rooms.map((item,index)=>(
                        <tr key={index}>
                           <td className='py-3 px-3 border-1 border-gray-200'>{item.roomType}</td>
                           <td className='py-3 px-3 border-1 border-gray-200'>{item.amenities.join(',')}</td>
                           <td className='py-3 px-3 border-1 border-gray-200'>${item.pricePerNight}</td>
                            <td className='py-3 px-3 border-1 border-gray-200 text-center text-red-700'>
                                <div>
                                    <div onClick={()=>{toggleavailability(item._id)}}    className={`${item.isAvailable?'bg-blue-700':'bg-slate-700'} rounded-full w-10 h-6 cursor-pointer`}>
                                        <div className={`flex ${item.isAvailable?'justify-end':'justify-start'} `}>
                                           <span className={`rounded-full bg-white mx-0.5 w-4.5 h-4.5 mt-0.5   absolute`}></span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
            //  
                    ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default List
