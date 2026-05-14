const nodemailer = require("nodemailer");

// Function to send OTP email
const sendEmail = async (email, otp) => {

    // transporter is responsible for sending email
    const transporter = nodemailer.createTransport({
        // using gmail service
        service: "gmail",
        // gmail authentication
        auth: {
            user: process.env.EMAIL, // gmail address
            pass: process.env.EMAIL_PASSWORD, //
        }
    });

    // email content
    const mailOptions = {
        
        // sender email
        from: process.env.EMAIL,

        // receiver email
        to: email,

        // email subject
        subject: "Password Reset OTP",

        // HTML template for email body
        html: `
         <div style="background:#111;padding:30px;color:white">
         
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
      </div>
        `
    };
    // send email
    await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;