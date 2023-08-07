import { connect } from "@/utils/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, remember } = reqBody;

    if (!email || !password) {
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

    if (!userExist) {
      return NextResponse.json(
        { status: "error", message: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, userExist.password);

    if (!validPassword) {
      return NextResponse.json(
        { status: "error", message: "Invalid password" },
        { status: 400 }
      );
    }

    // Create and assign a token
    const token = await jwt.sign(
      { _id: userExist._id, email: userExist.email },
      process.env.TOKEN_SECRET!
    );

    const response = NextResponse.json({
      status: "success",
      message: "Login successful",
      data: userExist,
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
