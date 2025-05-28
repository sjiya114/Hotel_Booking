import React from 'react'
import Title from '../../Title'
import { assets } from '../../../assets/assets'
import { UseAppContext } from '../../../Context/AppContext'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
const Addroom = () => {
  const {token}=UseAppContext();
  const [images,setImages]=useState({
    image0:null,
    image1:null,
    image2:null,
    image3:null
  });

  const [input,setInputs]=useState({
    roomType:'',
    pricePerNight:"",
    amenities:
    {
      'Free wifi':false,
      'Free breakfast':false,
      'Room Service':false,
      'Mountain View':false,
      'Pool Access':false,
    }
  })

  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    console.log(input.pricePerNight +" "+input.roomType)
    const formData = new FormData();
    formData.append("roomType", input.roomType); // "file" matches backend multer setup
    formData.append("pricePerNight",input.pricePerNight);
    formData.append("image",images.image0);
    formData.append("image",images.image1);
    formData.append("image",images.image2);
    formData.append("image",images.image3);
    const amenities=Object.keys(input.amenities).filter((amenity)=>
    input.amenities[amenity]
    )
    formData.append("amenities",JSON.stringify(amenities));
    console.log(amenities);
    const res=await axios.post("http://localhost:3000/rooms/add-rooms",formData, {
        headers: { "Content-Type": "multipart/form-data" ,  Authorization: `Bearer ${token}` } // Required for file uploads
      });
        console.log(res);
      if(res.data.success)
      {
         toast.success(res.data.message);
        setInputs({
    roomType:'',
    pricePerNight:"",
    amenities:
    {
      'Free wifi':false,
      'Free breakfast':false,
      'Room Service':false,
      'Mountain View':false,
      'Pool Access':false,
    }
  })
  setImages({
    image0:null,
    image1:null,
    image2:null,
    image3:null
  })
      }
      else
      {
        toast.error(res.data.error);
      }

  }
  return (
    <>
    <div className='ml-3 mt-40'>
       <Title title="Add Room" subtitle="Fill in the details carefully and accurate room details,pricing,amenities,
     to enhance user booking experience" align="left" />
    </div>
    <div className='mx-3'>
         <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
          <div>
              <h2 className='text-gray-600 font-bold my-6 ml-6'>Images</h2>
               <div className='flex flex-row flex-wrap space-x-4'>
                    <label htmlFor="image0">
                      <img src={assets.uploadArea}  alt="upload_area" />
                        <input type="file"   onChange={(e)=>{ setImages({...images,[e.target.name]:e.target.files[0]});}}  placeholder='Image'  id='image0' name='image0' hidden/> 
                    </label>
                    <label htmlFor="image1">
                      <img src={assets.uploadArea}  alt="upload_area" />
                        <input type="file"  placeholder='Image' onChange={(e)=>{ setImages({...images,[e.target.name]:e.target.files[0]});}}  id='image1' name='image1' hidden/> 
                    </label>
                    <label htmlFor="image2">
                      <img src={assets.uploadArea}  alt="upload_area" />
                        <input type="file"  placeholder='Image' onChange={(e)=>{ setImages({...images,[e.target.name]:e.target.files[0]});}}   id='image2' name='image2' hidden/> 
                    </label>
                    <label htmlFor="image3">
                      <img src={assets.uploadArea}  alt="upload_area" />
                        <input type="file" placeholder='Image'  onChange={(e)=>{ setImages({...images,[e.target.name]:e.target.files[0]});}}  id='image3' name='image3' hidden/> 
                    </label>
               </div>
               <div className='flex flex-row mt-6 space-x-6'>
                <div className='flex flex-col'>
                   <label htmlFor="roomType">Room Type</label>
                <select  id='roomType'  onChange={(e)=>{setInputs({...input,[e.target.name]:e.target.value})}}  className='border-2 px-2 py-2 mb-1 w-full border-gray-400 rounded-md mt-4' name='roomType'>
                <option  value="single-bed">Single Bed</option>
                <option value="double-bed" >Double Bed</option>
                 <option value="luxury-room" >Luxury Room</option>
                  <option value="family-suites" >Family Suite</option>
              </select>
                </div>
                
              <div className='flex flex-col'>
                 <label htmlFor="pricePerNight">Price Per Night</label>
               <input type="text" value={input.pricePerNight}  onChange={(e)=>{setInputs({...input,[e.target.name]:e.target.value})}}   className='border-gray-500 mt-4 w-fit border-1 rounded-lg ' id="pricePerNight" name="pricePerNight" />
              </div>
              
               </div>
               <h2 className='text-gray-600 font-bold my-6 ml-6'>Amenities</h2>
               <div className='flex flex-col' >
                <div className='flex flex-row space-x-2'>
                    <label htmlFor="Free wifi">Free wifi</label>
                <input type="checkbox" checked={input.amenities["Free wifi"]} onChange={()=>{setInputs({...input,amenities:{...input.amenities,["Free wifi"]:!input.amenities["Free wifi"]}})}}    name="Free wifi" value="Free wifi" />
                </div>
                  <div className='flex flex-row  space-x-2'>
                    <label htmlFor="Free breakfast">Free Breakfast</label>
                 <input type="checkbox" checked={input.amenities["Free breakfast"]} onChange={(e)=>{setInputs({...input,amenities:{...input.amenities,["Free breakfast"]:!input.amenities["Free breakfast"]}})}}   name="Free breakfast" value="Free Breakfast" />
                 </div>
                    <div className='flex flex-row  space-x-2'>
                  <label htmlFor="Room Service">Room Service</label>
                  <input type="checkbox" checked={input.amenities["Room Service"]} onChange={(e)=>{setInputs({...input,amenities:{...input.amenities,["Room Service"]:!input.amenities["Room Service"]}})}}   name="Room Service" value="Room Service" />
                  </div>
                     <div className='flex flex-row  space-x-2'>
                    <label htmlFor="Mountain View">Mountain View</label>
                   <input type="checkbox" checked={input.amenities["Mountain View"]} onChange={(e)=>{setInputs({...input,amenities:{...input.amenities,["Mountain View"]:!input.amenities["Mountain View"]}})}}   name="Mountain View" value="Mountain View" />
                    </div>
                       <div className='flex flex-row  space-x-2'>
                        <label htmlFor="Pool Access">Pool Access</label>
                    <input type="checkbox" checked={input.amenities["Pool Access"]} onChange={(e)=>{setInputs({...input,amenities:{...input.amenities,["Pool Access"]:!input.amenities["Pool Access"]}})}}   name="Pool Access" value="Pool Access" />
                     </div>
                   
               
          </div>
               <button className='bg-blue-900 text-white px-2 py-2 rounded-md mt-6'>Add Room</button>
           </div>
            </form>
          </div>

    </>
  )
}

export default Addroom
