const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, otp) => {

  try {

    const response = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: email,

      subject: "Password Reset OTP",

      html: `
        <div style="background:black;padding:30px;color:white">

          <h1>Your OTP</h1>

          <h2 style="
            color:#00ff99;
            letter-spacing:8px;
          ">
            ${otp}
          </h2>

          <p>OTP expires in 5 minutes</p>

        </div>
      `,
    });

    console.log("EMAIL SENT:", response);

  } catch (error) {

    console.log("RESEND ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = sendEmail;