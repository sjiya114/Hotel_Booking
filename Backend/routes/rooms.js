const express=require('express');
const {createRoom,getRoom,specificHotelRoom,toggleRoom}=require('../Controller/RoomController');
const Router=express.Router();
const multer=require('multer');
const { isLoggedIn } = require('../middleware/auth');
const upload = multer({storage:multer.diskStorage({})})
Router.post("/add-rooms",upload.array("image",4),isLoggedIn,createRoom);
Router.get("/getall",getRoom);
Router.get("/gethotelroom",isLoggedIn,specificHotelRoom);
Router.post("/availability",isLoggedIn,toggleRoom);
module.exports=Router;