import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/utils/connectDatabase";
import { getDataFromToken } from "@/utils/getIdFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const userData = await User.findById(userId).select([
      "-password",
      "-__v",
      "-_id",
    ]);
    if (!userData) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "User found", data: userData },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
