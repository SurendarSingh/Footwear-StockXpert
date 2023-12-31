import { connect } from "@/utils/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyEmail } from "@/utils/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, remember } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { status: "error", message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Check if password has character 8 - 20
    if (password.length < 8 || password.length > 20) {
      return NextResponse.json(
        {
          status: "error",
          message: "Password must be between 8 - 20 characters",
        },
        { status: 400 }
      );
    }

    // Check if user already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { status: "error", message: "User already exist" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user
    const savedUser = await newUser.save();

    // Send verification email
    await verifyEmail(email, savedUser._id.toString());

    // Create and assign a token
    const token = await jwt.sign(
      { _id: savedUser._id, email: savedUser.email },
      process.env.TOKEN_SECRET!
    );

    const response = NextResponse.json({
      status: "success",
      message: "User created successfully",
      data: savedUser,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
