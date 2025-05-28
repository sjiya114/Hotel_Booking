const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();  //for configuring .env file
const db=require('./config/db');//starting db
app.use(cors()); //for connecting frontend with backend
app.use(express.json()); //for processing input from frontend
app.use('/uploads', express.static('uploads')); //for file uploads
const userSchema=require('./models/User'); //for initailizing collection in mongodb atlas
const user = require('./routes/user'); 
const hotel = require('./routes/hotel');
const rooms = require('./routes/rooms');
const booking=require('./routes/booking');
const connectCloudinary = require('./config/cloudinary');
connectCloudinary();
app.use("/user",user); 
app.use("/hotel",hotel);
app.use("/rooms",rooms);
app.use("/booking",booking);
app.use("/images", express.static('uploads'))
const PORT=3000 || process.env.PORT ;
app.listen(PORT,()=> //starting server
{
    console.log(`app start running on http://localhost:${PORT}`)
});
