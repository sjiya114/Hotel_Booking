import React from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { UseAppContext } from '../Context/AppContext';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
function Login() {
  const {setToken,setUser}=UseAppContext();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav=useNavigate();
 const submitButton=async(e)=>
    {
      e.preventDefault();
      const user={email:email,password:password};
      let res=await axios.post(`/user/login`,user);
      console.log(res.data);
      if(res.data.success)
      {
         setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("token",res.data.token);
        toast.success("logged in successfully");
        console.log("successfully created user");
       nav("/");
       
      }
    }
  return (
    <>
     <div  id='welcome-bottom' className='h-screen flex flex-col mt-10  px-4 bg-gray-200 '>
        <div className='py-2 mt-10'>
           <h1 className='text-black font-bold text-2xl py-2'>Signin to your account </h1>
        </div>
        <div className='flex flex-col'>
           <form onSubmit={submitButton}> 
             <div>
              <label  htmlFor="email" className='block ml-3 absolute bg-gray-200 '  >Email address</label>
              <input onChange={(e)=>{setEmail(e.target.value)}} value={email}   className='border-2 px-2 py-1 mb-2 w-full border-gray-400 rounded-md mt-4'  placeholder='Enter email address' name='email' type="text" required /></div>
            <div>
               <label htmlFor="password"  className='block ml-3 absolute bg-gray-200'>Password</label>
              <input onChange={(e)=>{setPassword(e.target.value)}} value={password} minLength={8} className='border-2 px-2 py-1 mb-1 w-full border-gray-400 rounded-md mt-4' placeholder='Enter password'  name='password' type="password" required /></div>
               <div className='mt-4'>
              <button className='bg-gray-400 text-center w-full rounded-md px-4 py-2 text-gray-950 hover:bg-purple-600 hover:text-white'>Login</button>
              <h6>Don't have a account? <Link to="/signup">Signup</Link></h6> 
           </div>
           </form>
        </div>
     </div>
    </>
  )
}

export default Login
