const express=require('express');
const { isLoggedIn } = require('../middleware/auth');
const { hotelRegister } = require('../Controller/HotelController');
const Router=express.Router();
Router.post("/register",isLoggedIn,hotelRegister);
module.exports=Router;