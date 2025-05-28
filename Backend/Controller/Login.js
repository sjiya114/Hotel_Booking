const jwt=require('jsonwebtoken');
const userData=require('../models/User');
const bcrypt=require('bcryptjs');

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

module.exports.loginUser = async (req, res) =>{
    const {email,password} = req.body;
    try{
      const user = await userData.findOne({email})
      if(!user){
          return res.json({success:false, message:"User does not exist"})
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
         return res.json({success:false, message:"Invalid Credentials"})
      }
      const token = createToken(user._id);
      res.json({success:true,message:"Logged in successfully",token:token,user:user});
  
    }catch (error){
      console.log(error);
      res.json({success:false, message:"Error"})
      
    }
  }