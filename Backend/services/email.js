// @ts-nocheck
import { SMTP_HOST, SMTP_PORT, GMAIL_PASS, GMAIL_USER } from "../config/env.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (mailOptions) => {
  const { to, otp, first_name, last_name } = mailOptions;

  const mailData = {
    from: `Lightnings <${GMAIL_USER}>`,
    to,
    subject: "Lighnings Otp",
    text: `Hello ${first_name} ${last_name}, your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailData);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
