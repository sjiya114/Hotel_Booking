import React from 'react'
import Form from './Form'

function Hero() {
  return (
    <div className='flex flex-col h-fit max-sm:items-center pb-20  min-md:pt-[40vh]  max-md:pt-[50vh]  justify-center bg-[url("/src/assets/heroImage.png")] bg-center bg-cover bg-no-repeat  text-white '>
       <p className='bg-blue-400  mt-20 w-fit max-w-lg:mx-10  max-w-lg:mx-0 max-lg:px-3.5   text-white py-2 mx-32 px-3.5  rounded-2xl '>The Ultimate Hotel Experience</p>
       <h1 className='text-7xl max-sm:text-6xl   mx-32    mt-4 max-w-xl font-bold font-playfair'>Discover your Perfect Gateway Destination</h1>
       <p className='text-sm  mx-32 max-lg:mx-[16vw] pt-2  max-w-xl  '>Unparalleled luxury and comfort awaits at world's modt exclusive hotels and resorts.Start yoour journey today </p>
        <Form/>
    </div>
  )
}

export default Hero
