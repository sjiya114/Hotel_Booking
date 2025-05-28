const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"user"},
    image:{type:String,required:false},
    password:{type:String,required:true},
    recentSearchCities:[{type:String,required:true}]
},{timestamps:true});
module.exports=mongoose.model("user",userSchema);