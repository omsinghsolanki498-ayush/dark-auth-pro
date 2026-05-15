const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});


transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP CONNECTION ERROR:", error);
    } else {
        console.log("SMTP Server is ready to send emails");
    }
});

const sendEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"Dark Auth Pro" <${process.env.EMAIL}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div style="background:#111;padding:30px;color:white">
                    <h2>Your OTP Code</h2>
                    <h1 style="letter-spacing:8px">${otp}</h1>
                    <p>This OTP expires in 5 minutes.</p>
                </div>
            `,
        });
        console.log("OTP sent successfully. MessageId:", info.messageId);
    } catch (err) {
        console.log("EMAIL ERROR:", err.message);
        throw err;
    }
};

module.exports = sendEmail;