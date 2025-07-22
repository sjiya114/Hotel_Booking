const Booking =require('../models/Booking');
const Rooms  =require('../models/Rooms');
const Hotel =require('../models/Hotel');
const transporter=require('../config/nodemailer');
const razorpay=require('razorpay');
const instance=new razorpay({
  key_id:process.env.RAZORPAY_KEYID,
  key_secret:process.env.RAZORPAY_KEYSECRET
})
const availability=async(room,checkInDate,checkOutDate)=>
{
// console.log(room);
 const available=await Booking.find({room,checkInDate:{$lte:checkOutDate}
        ,checkOutDate:{$gte:checkInDate}});
// console.log(available);
return available.length===0;
}
//API to check availability status
module.exports.isAvailable=async(req,res)=>
{
    try
    {
       const {room,checkInDate,checkOutDate,guests}=req.body;
      //  console.log(room);
        const available=await availability(room,checkInDate,checkOutDate);
        res.json({success:true,available:available});
    }
    catch(e)
    {
        res.json({success:false,error:e})
    }
}
//API to create booking

module.exports.bookRoom = async (req, res) => {
  try {
  
    const { room, checkInDate, checkOutDate, guests } = req.body;

    const user = req.user._id;
   
    // Fetch room and populate hotel
    const rooms = await Rooms.findById(room).populate("hotel");
    if (!rooms) {
      return res.json({ success: false, message: "Room not found" });
    }
  
    const pricePerNight = rooms.pricePerNight;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Date validation
    if (checkOut <= checkIn) {
      return res.json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const totalPrice = pricePerNight * nights;

    console.log("stage4 - Price calculated", {
      pricePerNight,
      nights,
      totalPrice,
    });

    // Create booking
   
    const booking = await Booking.create({
      user: user,
      room: room,
      hotel: rooms.hotel._id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: Number(totalPrice),
      guests: Number(guests),
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.sender,
      to: req.user.email,
      subject: "Hotel Booking Details",
      html: `
        <h2>Hotel Booking Confirmation</h2>
        <p>Dear ${req.user.username},</p>
        <p>Thank you for booking. Here are your booking details:</p>
        <ul>
          <li>Hotel Name: ${rooms.hotel.name}</li>
          <li>Location: ${rooms.hotel.address}</li>
          <li>Check-In Date: ${checkInDate}</li>
          <li>Check-Out Date: ${checkOutDate}</li>
          <li>Total Price: ₹${totalPrice}</li>
          <li>Guests: ${guests}</li>
          <li>Room Type: ${rooms.type || 'Standard'}</li>
        </ul> 
        <p>We look forward to welcome you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, booking });
  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};





// module.exports.bookRoom=async(req,res)=>
// {
//     try
//     {
//         console.log("stage1");
//         const {room,checkInDate,checkOutDate,guests}=req.body;
//         console.log(room,checkInDate,checkOutDate,guests);
//         const user=req.user._id;
//         console.log("stage2");
//         // const isAvailable=availability(room,checkInDate,checkOutDate);
//         // console.log("stage3");
//         // if(!isAvailable)
//         // {
//         //     res.json({success:false,message:"room not available"});
//         // }
//         const rooms=await Rooms.findById({_id:room}).populate("hotel");
//         console.log("stage4"+rooms);
//         const pricePerNight=rooms.pricePerNight;
//         const checkIn=new Date(checkInDate);
//         const checkOut=new Date(checkOutDate);
//         const timediff=checkOut.getTime()-checkIn.getTime();
//         const nights=Math.ceil((timediff)/(3600*24*1000));
//         const totalprice=  pricePerNight*nights;
       
//          console.log(user+" "+room+" "+rooms.hotel._id);
//          console.log(checkInDate);
//          const booking=await Booking.create({
//      user:user,
//     room:room,
//     hotel:rooms.hotel._id,
//     checkInDate:checkInDate,
//     checkOutDate:checkOutDate,
//     totalPrice:Number(totalprice),
//     guests:Number(guests),
//          });
//          console.log("stage6");
//          const mailoptions={
//             from:process.env.sender,
//             to:req.user.email,
//             subject:"Hotel Booking Details",
//             html:`
//              <h2>Hotel BBking Details</h2>
//              <p>Dear ${req.user.username}</p>
//              <p>Thankyou for booking.Here are your booking details:</p>
//              <ul>
//              <li>Hotel Name:${booking.hotel.name}</li>
//              <li>Location:${booking.hotel.address} </li>
//              <li>Check-In-Date:${checkInDate}</li>
//              <li>Check-Out-Date:${checkOutDate}</li>
//              <li>Total Price:${pricePerNight}</li>
//              <li>Guests:${guests}</li>
//              <li>Room Type:{}</li>
//              </ul> 
//              <p>We look forward to welcome you</p> 
//             `
//          }
//          await transporter.sendMail(mailoptions);
//          console.log("stage7");
//          res.json({success:true,booking});
//     }
//     catch(e)
//     {
//         res.json({success:false,error:e})
//     } 
// }
//API to get all booking from user
module.exports.getAllBooking=async(req,res)=>
{
    try {
       
        const client=req.user._id;
        const booking=await Booking.find({user:client}).populate("room hotel").sort({createdAt:-1});
        
        res.json({success:true,booking:booking});
    } catch (error) {
        res.json({success:false,error:error})
    }
}
module.exports.getHotelBooking=async(req,res)=>
{
    console.log(req.user._id);
  try {
        const hotel=await Hotel.findOne({owner:req.user._id});
        if(!hotel)
        {
             res.json({success:false,message:"no hotel found"});
        }
      
        const bookings=await Booking.find({hotel:hotel._id}).populate("room hotel user").sort({createdAt:-1});
        const totalBookings=bookings.length;
       
        const totalRevenue=bookings.reduce((acc,booking)=>acc+booking.totalPrice,0);

        res.json({success:true,dashboarddata:{totalBookings,totalRevenue,bookings}});

    } catch (error) {
        res.json({success:false,error:error})
    }   
}

//for payment integration
module.exports.payment=async(req,res)=>
{
  try {
     const {bookingId}=req.params;
  const {origin}=req.headers;
  console.log("step1");
  const bookingData=await Booking.findById({_id:bookingId}).populate("user");
   console.log("step--");
  const paymentLinkRequest={
    amount:Number(bookingData.totalPrice),
    currency:'INR',
    customer:{
      name:bookingData.user.username,
      email:bookingData.user.email
    },
    notify:
    {
      email:true,
      sms:true
    },
    callback_url:`${origin}/my-bookings/${bookingId}`,
    callback_method:'get'
  }
   console.log("step2");
  const paymentLink=await instance.paymentLink.create(paymentLinkRequest);
  const paymentLinkId=paymentLink.id;
  const paymentLinkUrl=paymentLink.short_url;
   console.log("step3");
  const resData={
    paymentLinkId,paymentLinkUrl
  }
   console.log("step5");
 res.json({success:true,resData:resData});
  } catch (error) {
    return res.json({success:false,message:error.message});
  }
 
}
module.exports.updateData=async(req,res)=>
{
const {paymentId,bookingId}=req.body;
try {
 const bookingData=await Booking.findOne({_id:bookingId});
 
  let payment;
  try {
   const paymentList = await instance.paymentLink.fetch(paymentId);
     payment = paymentList.payments;
  } catch (err) {
    console.error("Error while fetching payment:", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch payment" });
  }
 if(payment[0].status==='captured')
 {
  bookingData.status="confirmed";
  bookingData.paymentMethod="Razor Pay";
  bookingData.isPaid=true;
  await bookingData.save();
   res.json({success:true,message:"payment done successfully"});
 }
 else
 {
  return res.json({success:false,message:"error while making payment"});
 }

} catch (error) {
   return res.json({success:false,message:error.message});
}
}