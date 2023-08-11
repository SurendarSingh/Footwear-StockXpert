import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/utils/database";
import emailTemplate from "@/components/emailTemplate";

connect();

const transport = nodemailer.createTransport({
  service: "gmail",
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
      from: process.env.NODEMAILER_USER!,
      to: email,
      subject: "Welcome to Geetha Fancy Store",
      html: emailTemplate(link),
    };
    await transport.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};
