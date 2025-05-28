import React from 'react'
import Title from './Title'
import StarRating from './StarRating'
import { testimonials } from '../assets/assets'

function Testimonials() {
  return (
    <div className='bg-gray-200 pt-2 pb-10'>
       <Title title="What our guests say"  align="center" subtitle="Discover why discrening travellers consistently choose quickstay for their exclusive and luxurious accomodations around the world. "  />
        <div className='flex flex-row max-lg:flex-col space-y-4  flex-wrap justify-between px-20  pt-20  '>
       {testimonials.map((testimonial,index)=>(
          <div key={index} className='flex flex-col w-[25%] max-lg:w-full  bg-white border-gray-500 border-1 rounded-lg px-2 py-2 text-gray-700 '>
         <div className='flex flex-row'>
               <div>
                 <img className='rounded-full w-20 h-20' src={testimonial.image} alt="" />
               </div>
               <div>
                 <h1 className='text-black'>{testimonial.name}</h1>
              <p>{testimonial.address}</p>
               </div>   
         </div>
         {/* <div>
          <StarRating rating={testimonial.rating}/>
         </div> */}
         <div>
            <p>{testimonial.review}</p>
         </div>
       </div>
       ))} 
        </div>
    </div>
  )
}

export default Testimonials
