//const nodemailer = require("nodemailer")

import nodemailer from "nodemailer";

export const sendForgotPasswordEmail = async ( email, token) => {

  

   try {

    let mailTransport = nodemailer.createTransport({
    service: "gmail",
    
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    }

    })

    const mailDetails = {
      from: `${process.env.EMAIL}`,
        to: `${email}`,// email
        // to: email
        subject: "Forgot Password",
        html: `
        <h1>Forgot Your Password? No Worries., 
        <a href="https://www.my-frontend.com/reset-password/${token}">Click the link to reset your password</a>
    </h1>`
         

   }

   await mailTransport.sendMail(mailDetails)

   } catch (error) {
     console.error("Error sending email:", error);
   }

}

export function validEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// module.exports = {
//   sendForgotPasswordEmail,
//   validEmail
//}

