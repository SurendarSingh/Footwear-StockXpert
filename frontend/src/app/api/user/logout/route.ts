import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      status: "success",
      message: "Logout success",
    });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
