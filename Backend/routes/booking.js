const express=require('express');
const { isLoggedIn } = require('../middleware/auth');
const {isAvailable,bookRoom,getAllBooking,getHotelBooking}=require('../Controller/BookingController');
const Router=express.Router();
Router.post("/checkavailability",isAvailable);
Router.post("/book",isLoggedIn,bookRoom);
Router.get("/user",isLoggedIn,getAllBooking);
Router.get("/hotel",isLoggedIn,getHotelBooking);
module.exports=Router;