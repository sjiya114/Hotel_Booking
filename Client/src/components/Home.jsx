import React from 'react'
import Hero from './Hero'
import FeaturedDestination from './FeaturedDestination'
import ExclusiveOffers from './ExclusiveOffers'
import Testimonials from './Testimonials'
import NewsLetter from './NewsLetter'
import Footer from './Footer'
import RecommendedHotels from './RecommendedHotels'

function Home() {
  return (
    <>
    <Hero/>
     <RecommendedHotels/>
    <FeaturedDestination/>
    <ExclusiveOffers/>
    <Testimonials/> 
     <NewsLetter/>
    </>
  )
}

export default Home
