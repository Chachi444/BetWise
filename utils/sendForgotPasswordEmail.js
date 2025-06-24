const nodemailer = require("nodemailer");

async function sendForgotPasswordEmail(to, token) {
  const resetLink = `http://localhost:3000/reset-password/${token}`; // Change to your frontend URL

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,

    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 10 minutes.</p>`,
  });
}

module.exports = sendForgotPasswordEmail;