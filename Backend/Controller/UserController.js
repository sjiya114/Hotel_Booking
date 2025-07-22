// GET:/api/user (To get the user data)
module.exports.fetchUserData=async(req,res)=>
{
try
{
    const role=req.user.role;
    const userdata=req.user.recentSearchCities;
   
    res.json({success:true,role:role,data:userdata});
}
catch(err)
{
    res.json({success:false,message:err})
}
}
module.exports.recentSearchCities=async(req,res)=>
{
    const {recentSearch}=req.body;
    try
    {
      const client=await req.user;
    if(client.recentSearchCities.length<3)
    {
        client.recentSearchCities.push(recentSearch);
    }
    else
    {
        client.recentSearchCities.shift();
        client.recentSearchCities.push(recentSearch);
    }
    client.save();
  
    res.json({success:true,message:"city added successfully"});
    }
    catch(e)
    {
        res.json({success:false,message:e});
    }
}
module.exports.checkAuth=async(req,res)=>
{
     res.json({success:true,user:req.user});
}