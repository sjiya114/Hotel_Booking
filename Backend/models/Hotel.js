const mongoose=require('mongoose');
const hotelSchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    owner:{type:String,ref:"user",required:true},
     city:{type:String,required:true},
},{timestamps:true});

module.exports=mongoose.model("hotel",hotelSchema);