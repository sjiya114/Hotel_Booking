import React from 'react'
import './Signup.css'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { UseAppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function Signup() {
  const {setUser,setToken}=UseAppContext();
  const nav=useNavigate();
  const navigate = useNavigate()
  const [data, setData] = useState({
    username:"",
    email: "",
    password:"",
    role:"user",
   image:""
  })


  const fileInput = useRef(null);
  const onChangeHandler=(e)=>
    {
        if(e.target.name==="image")
       {
        setData({...data,[e.target.name]:e.target.files[0]});
       }
       else
       setData({...data,[e.target.name]:e.target.value});
      };

  const handlesubmit=async(e)=>
    {
       e.preventDefault();
       console.log(data);
    const formData = new FormData();
    formData.append("username", data.username); // "file" matches backend multer setup
    formData.append("email", data.email);
    formData.append("password",data.password);
    formData.append("role", data.role);
    formData.append("image", data.image);
    console.log(data.image);
      const res=await axios.post("/user/signup",formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
      });
      if(res.status===200)
        {
            
            console.log("successfully submitted form");
            // Window.location.reload();
            if(res.data.success){
              setToken(res.data.token);
              setUser(res.data.user);
              localStorage.setItem("token",res.data.token);
              
                setData({
                  username: "",
                  email: "",
                  password: "",
                  role: "",
                  image: null, // Change from '' to null

                });
                if(fileInput.current){
                  fileInput.current.value="";
                }
                toast.success("logged in successfully");
              navigate("/");
           }
           else{
              console.log(res.data.message);
           }
        } 
    } 
  return (
    <>
     <div id='welcome-bottom' className='h-screen flex mt-10 flex-col bg-gray-200 '>
       <div>
         <h1  className='text-black mt-12 font-bold text-2xl px-4 py-2'>Create Account</h1>
       </div>
        <div className='flex flex-col px-4'>
          <form onSubmit={handlesubmit}  encType='multipart/form-data' >
            <div>
              <label htmlFor="username" className='block ml-3 absolute bg-gray-200 '>UserName</label>
              <input onChange={onChangeHandler} value={data.username} className='border-2 px-2 py-1 mb-1 w-full border-gray-400 rounded-md mt-4' name='username' type="text" required /></div>
            <div> 
               <label htmlFor="email"  className='block ml-3 absolute bg-gray-200'>Email address</label>
              <input onChange={onChangeHandler} value={data.email}   className='border-2 px-2 py-1 mb-1 w-full border-gray-400 rounded-md mt-4' name='email' type="text" required /></div>
            <div> 
               <label htmlFor="password"  className='block ml-3 absolute bg-gray-200'>Password</label>
              <input  onChange={onChangeHandler} value={data.password}  minLength={8} className='border-2 px-2 py-1 mb-1 w-full border-gray-400 rounded-md mt-4' type="password" name='password' required/></div>
              <div>
              <label htmlFor="role"  className='block ml-5 absolute bg-gray-200'>Role</label>
              <select onChange={onChangeHandler} value={data.role}  id='role' className='border-2 px-2 py-2 mb-1 w-full border-gray-400 rounded-md mt-4' name='role'>
                <option  value="user">User</option>
                <option value="admin" >Owner</option>
              </select>
              </div>
               <div>
                <label htmlFor="image"     className='block ml-5 absolute bg-gray-200' >Image</label>
                <input onChange={onChangeHandler}  className='border-2 px-2 py-2 mb-1 w-full border-gray-400 rounded-md mt-4' ref={fileInput}   placeholder='Upload Image'  type="file" id='image' name='image'/> 
               </div>
           <div className='button-submit'>
              <button type='submit' className='bg-gray-400 text-center w-full rounded-md px-4 py-2 text-gray-950 hover:bg-purple-600 hover:text-white'>Create Account</button>
              <h6>Already have a account? <Link href="/login">Login</Link></h6> 
           </div>
          </form>
        </div>
     </div>
    </>
  )
}

export default Signup
