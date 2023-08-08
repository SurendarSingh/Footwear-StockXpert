import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST!,
  port: Number(process.env.EMAIL_PORT) || 0,
  auth: {
    user: process.env.NODEMAILER_USER!,
    pass: process.env.NODEMAILER_PASS!,
  },
});

export const verifyEmail = async (email: string, userId: string) => {
  try {
    const token = await bcryptjs.hash(userId, 10);
    await User.findByIdAndUpdate(userId, {
      verifyToken: token,
      verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });
    const link = `${process.env.DOMAIN!}/verifyemail?token=${token}`;
    const message = {
      from: process.env.NODEMAILER_EMAIL!,
      to: email,
      subject: "Verify your email address - Geetha Fancy Store",
      html: `
        <div>
          <h1>Verify your email address</h1>
          <p>Thanks for creating an account with Geetha Fancy Store. Please click the button below to verify your email address.</p>
          <a href="${link}" style="padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>  
      `,
    };
    await transport.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};
