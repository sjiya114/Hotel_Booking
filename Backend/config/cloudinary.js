const { v2} =require('cloudinary');
const connectCloudinary=async()=>
{
    v2.config(
        {
          cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
          api_key:process.env.CLOUDINARY_API_KEY,
          api_secret:process.env.CLOUDINARY_API_SECRET
        }
    )
}
module.exports=connectCloudinary;