const hotelModel=require('../models/Hotel');
const User = require('../models/User');

const {v2} =require('cloudinary');
const Rooms=require('../models/Rooms');

//API to create a new room for hotel
module.exports.createRoom=async(req,res)=>
{
try
{
const {roomType,pricePerNight,amenities}=req.body;
console.log(roomType+" "+Number(pricePerNight));
const hotel=await hotelModel.findOne({owner:req.user._id});
if(!hotel)
    {
        console.log("hello");
        return res.json({success:false,message:"hotel not registered yet"});
    } 
  console.log("second stage");
   const uploadImages=req.files.map(async(file)=>
{
    const response=await v2.uploader.upload(file.path);
    console.log("third stage");
    return response.secure_url; 
})
 console.log(uploadImages);
const images=await Promise.all(uploadImages);
console.log("final stage");
const result= await Rooms.create({
    hotel:hotel._id,
    roomType:roomType,
    pricePerNight:Number(pricePerNight),
    amenities:JSON.parse(amenities),
    images:images,
})
console.log("done");
res.json({success:true,message:"room added successfuly",result});
}
catch(e)
{
    return res.json({success:false,message:"error"})
}

}
//API to get all rooms
module.exports.getRoom=async(req,res)=>
{
try
{
console.log("hello");
const room=await Rooms.find({isAvailable:true}).populate(
{
    path:'hotel',
    populate:
    {
        path:'owner',
        select:'image'
    }
}
).sort({createdAt:-1});
console.log(room);
res.json({success:true,room});
}
catch(e)
{
    res.json({success:false,error:e});
}
}
//API to get all rooms for a specific hotel
module.exports.specificHotelRoom=async(req,res)=>
{
try
{
console.log("hello");
const hotel=await hotelModel.findOne({owner:req.user._id});
const rooms=await Rooms.find({hotel:hotel._id}).populate("hotel");
console.log(rooms);
res.json({success:true,rooms});
}
catch(e)
{
    res.json({success:false,error:e});
}
}
//API to toggle availability of rooms
module.exports.toggleRoom=async(req,res)=>
{
try
{
const {id}=req.body;
const room=await Rooms.findOne({_id:id});
room.isAvailable=!room.isAvailable;
await room.save();
res.json({success:true,message:"room availability updated successfully"});
}
catch(e)
{
    res.json({success:false,error:e});
}
}