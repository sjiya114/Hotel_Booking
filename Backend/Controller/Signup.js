const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const validator=require('validator');
const userData=require('../models/User');
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}
//REGISTER USER
module.exports.signUp = async (req, res) =>{
    const {username,email,password,role,image} = req.body;
   
    try{
      const exists = await userData.findOne({email});
      if(exists){
        return res.json({success:false, message:"User already exists"})
      }
      //validating yourEmail format and strong yourPassword
      if (!validator.isEmail(email)) {
        return res.json({success:false, message:"Please enter a valid yourEmail"})
      }

      if (password.length < 8) {
        return res.json({success:false, message:"Please enter a strong yourPassword"})
      }

       //HASHING USER yourPassword
       //RANGE of gensalt is 5 to 15
       const salt = await bcrypt.genSalt(10)
       const hashedyourPassword = await bcrypt.hash(password,salt);

       const newUser = new userData({
        username:username,
        email:email,
        password:hashedyourPassword,
        role:role,
        image:image
       })
        
       //For saving user data
        const user = await newUser.save()
        const token = createToken(user._id)
       
        res.json({success:true,message:"account created successfully",token:token,user:user});

    }catch(error){
       
        res.json({success:false,message:"Error"});
    }
}