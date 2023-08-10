import User from "@/models/userModel";
import { connect } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 400 });
    }

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { status: "failed", message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.isEmailVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { status: "success", message: "Verified" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
