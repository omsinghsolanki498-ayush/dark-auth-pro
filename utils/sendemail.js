// const nodemailer = require("nodemailer");

// // Function to send OTP email
// const sendEmail = async (email, otp) => {

//     // transporter is responsible for sending email
//     const transporter = nodemailer.createTransport({
//         // using gmail service
//         service: "gmail",
//         // gmail authentication
//         auth: {
//             user: process.env.EMAIL, // gmail address
//             pass: process.env.EMAIL_PASSWORD, //
//         }
//     });

//     // email content
//     const mailOptions = {
        
//         // sender email
//         from: process.env.EMAIL,

//         // receiver email
//         to: email,

//         // email subject
//         subject: "Password Reset OTP",

//         // HTML template for email body
//         html: `
//          <div style="background:#111;padding:30px;color:white">
         
//         <h2>Your OTP Code</h2>
//         <h1>${otp}</h1>
//       </div>
//         `
//     };
//     // send email
//     await transporter.sendMail(mailOptions);
// }
// module.exports = sendEmail;



const nodemailer = require("nodemailer");

// Function to send OTP email
const sendEmail = async (email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true = 465, false = 587
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Dark Auth Pro" <${process.env.EMAIL}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div style="background:#111;padding:30px;color:white;text-align:center">
                    <h2>Your OTP Code</h2>
                    <h1 style="color:#00ffcc; font-size:32px;">${otp}</h1>
                    <p>This OTP will expire in 5 minutes.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

    } catch (error) {
        console.log("EMAIL ERROR:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;