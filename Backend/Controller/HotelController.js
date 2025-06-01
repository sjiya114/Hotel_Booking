const mongoose=require('mongoose');
const userModel=require('../models/User');
const hotelModel=require('../models/Hotel');
module.exports.hotelRegister = async (req, res) =>{
    const {name,address,contact,city} = req.body;
    try{
      const owner=req.user._id;
      const exists = await hotelModel.findOne({owner:owner});
      if(exists){
        return res.json({success:false, message:"Owner already exists"})
      }
       const newHotel = new hotelModel({
        name:name,
        address:address,
        owner:owner,
        contact:contact,
        city:city
       })
       //For saving user data
        const hotel = await newHotel.save();
        const user=await userModel.findOneAndUpdate({_id:owner},{role:"admin"});
        res.json({success:true,message:"hotel registered successfully"});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}