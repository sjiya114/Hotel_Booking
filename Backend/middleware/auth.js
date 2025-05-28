const jwt=require('jsonwebtoken');
const usermodel=require('../models/User');
module.exports.isLoggedIn=async(req,res,next)=>
{
const token = req.headers.authorization?.split(" ")[1];
if(!token)
{
    return res.json({success:false,message:"token error"});
}
try
{
let decoded=jwt.verify(token,process.env.JWT_SECRET);
let user=await usermodel.findOne({_id:decoded.id}).select("-password");
if(user)
{
    req.user=user;
    next();
}
}
catch(e)
{
    res.json({error:e});
}
}