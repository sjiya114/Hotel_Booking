const mongoose=require('mongoose');
const roomSchema=new mongoose.Schema({
    hotel:{type:String,ref:"hotel",required:true},
    roomType:{type:String,required:true},
    pricePerNight:{type:Number,required:true},
    amenities:{type:Array,required:true},
    images:[{type:String,required:true}],
    isAvailable:{type:Boolean,required:true,default:true},
},{timestamps:true});

module.exports=mongoose.model("room",roomSchema);