const nodemailer=require('nodemailer');
const transporter =nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  port:process.env.SMTP_PORT,
  auth: {
    user:process.env.userId,
    pass:process.env.password,
  },
});
module.exports=transporter;