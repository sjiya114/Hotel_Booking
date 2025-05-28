const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
  host:process.env.host,
  port:587,
  auth: {
    user:process.env.userId,
    pass:process.env.password,
  },
});
module.exports=transporter;