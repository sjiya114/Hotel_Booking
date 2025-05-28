const express=require('express');
const { signUp } = require('../Controller/Signup');
const { loginUser } = require('../Controller/Login');
const multer=require('multer');
const { isLoggedIn } = require('../middleware/auth');
const { fetchUserData, recentSearchCities } = require('../Controller/UserController');
const router=express.Router();

const Storage = multer.diskStorage({

    // destination: (req, file, cb) => {
    //     cb(null, 'uploads/'); // Ensure 'uploads' directory exists
    // },
    // filename: (req, file, cb) => {
    //     cb(null, Date.now() + '-' + file.originalname);
    // }
  
    destination:"uploads",
    filename:(req,file,cb)=>{
        //To make file name unique
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({storage:Storage})
router.post("/signup",upload.single("image"),signUp);
router.post("/login",loginUser);
router.get("/",isLoggedIn,fetchUserData);
router.post("/recent-search",isLoggedIn,recentSearchCities);
module.exports= router;