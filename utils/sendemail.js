const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, otp) => {

  try {

    const response = await resend.emails.send({

      from: "DarkAuthPro <onboarding@resend.dev>",

      to: email,

      subject: "Your DarkAuthPro Verification Code",

      html: `
        <div style="
          max-width:600px;
          margin:auto;
          padding:30px;
          font-family:Arial,sans-serif;
          background:#ffffff;
          border:1px solid #e5e7eb;
          border-radius:12px;
        ">

          <h1 style="
            color:#111827;
            text-align:center;
          ">
            DarkAuthPro
          </h1>

          <p style="
            font-size:16px;
            color:#374151;
          ">
            Hello,
          </p>

          <p style="
            font-size:16px;
            color:#374151;
          ">
            Use the following OTP to reset your password:
          </p>

          <div style="
            text-align:center;
            margin:30px 0;
          ">

            <span style="
              display:inline-block;
              background:#2563eb;
              color:white;
              padding:16px 30px;
              font-size:32px;
              letter-spacing:8px;
              border-radius:10px;
              font-weight:bold;
            ">
              ${otp}
            </span>

          </div>

          <p style="
            color:#6b7280;
            font-size:14px;
          ">
            This OTP will expire in 5 minutes.
          </p>

          <p style="
            color:#6b7280;
            font-size:14px;
          ">
            If you did not request a password reset, you can safely ignore this email.
          </p>

          <hr style="
            margin:25px 0;
            border:none;
            border-top:1px solid #e5e7eb;
          ">

          <p style="
            text-align:center;
            color:#9ca3af;
            font-size:13px;
          ">
            © 2026 DarkAuthPro • Secure Authentication System
          </p>

        </div>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(response);

  } catch (error) {

    console.log("RESEND EMAIL ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = sendEmail;