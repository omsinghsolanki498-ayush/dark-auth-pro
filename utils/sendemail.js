const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <div style="background:#111;padding:30px;color:white">
                    <h2>Your OTP Code</h2>
                    <h1>${otp}</h1>
                </div>
            `,
        });

        console.log("OTP sent successfully");
    } catch (err) {
        console.log("EMAIL ERROR:", err);
        throw err;
    }
};

module.exports = sendEmail;