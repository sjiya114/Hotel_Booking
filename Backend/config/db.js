const mongoose=require('mongoose');
module.exports= mongoose.connect(process.env.MONGODB_URL).then(
    console.log("connected to db succesfully")
);
