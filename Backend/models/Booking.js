const mongoose=require('mongoose');
const bookingSchema=new mongoose.Schema({
    user:{type:String,ref:"user",required:true},
    room:{type:String,ref:"room",required:true},
    hotel:{type:String,ref:"hotel",required:true},
    checkInDate:{type:Date,required:true},
    checkOutDate:[{type:Date,required:true}],
    totalPrice:{type:Number,required:true},
    guests:{type:Number,required:true},
    status:{type:String,enum:["confirmed","pending","cancelled"],required:true,default:"pending"},
    paymentMethod:{type:String,required:true,default:"Pay at hotel"},
    isPaid:{type:Boolean,required:true,default:false},
},{timestamps:true});

module.exports=mongoose.model("booking",bookingSchema);