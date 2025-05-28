import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

function ExclusiveOffers() {
    return (
        <>
            <div className='flex flex-row justify-between mx-[12vw] flex-wrap max-lg:flex-col'>
                <div>
                    <Title title="Exclusive offers" align="left" subtitle="Take advantage of our limited offers and special package to enhance your stay and create unforgettable memories" />
                </div>
                <div className='mt-20'>
                    <button>View all Offers</button>
                    <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" />
                </div>
            </div>
            <div className='flex my-10 flex-row  justify-between  max-lg:flex-col mx-[5vw] space-y-10 items-center text-white' >
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className="bg-cover pl-2 w-[25%] max-lg:w-[80%]  rounded-lg  bg-no-repeat bg-center" style={{backgroundImage:`url(${item.image})`}} >
                        <div>
                            <button className="bg-white text-black rounded-2xl px-2 py-1 mt-2 ">{item.priceOff} % OFF</button>
                        </div>
                        <div className='flex flex-col'>
                            <h1>{item.title}</h1>
                            <p >{item.description}</p>
                              <p>{item.expiryDate}</p>
                        </div>
                        <div>
                            <button>View all Offers</button>
                            <img className='group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="arrow-icon" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ExclusiveOffers
