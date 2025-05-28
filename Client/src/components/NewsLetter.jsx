import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

function NewsLetter() {
  return (
    <div className='bg-gray-950 flex flex-col max-lg:mx-4 px-4  my-10 -y-4 items-center rounded-lg mx-20 pb-10'>
        <h1 className='text-white text-4xl pt-6 font-playfair  text-center'>Stay Inspired</h1>
         <p className='text-gray-500 pt-4 text-sm text-center'>Join our newsletter and be the first one to discover our new destinations ,exclusive offers and travel inspiration</p>
       <form className='flex pt-4 space-x-6 w-fit max-lg:space-x-3 '   action="">
        <input className='placeholder:text-gray-500 bg-gray-900 rounded-lg px-2  border2 border-gray-500  '   type='text' placeholder='Enter your Email'   />
       <button className='bg-black text-white rounded-md cursor-pointer px-2 py-2' type='submit' >Subscribe  <img src={assets.arrowIcon} alt="" />  </button>
       </form>
       <p className='text-gray-700 py-2'>By subscribing you agree to our privacy policy and consent to recieve updates</p>
    </div>
  )
}

export default NewsLetter
