import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/utils/database";
import fs from "fs";
import path from "path";

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

    const html = fs.readFileSync(
      path.join(process.cwd(), "public", "templates", "verifyEmail.html"),
      "utf8"
    );

    const htmlToSend = html.replace("{{link}}", link);

    const message = {
      from: process.env.NODEMAILER_USER!,
      to: email,
      subject: "Welcome to Geetha Fancy Store",
      text: htmlToSend,
      html: htmlToSend,
    };
    await transport.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};
