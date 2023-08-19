import { connect } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

connect();

export async function POST(request: NextRequest) {
  try {
    const options = {
      keepExtensions: true,
      maxFileSize: 200 * 1024 * 1024, // 200MB
    };

    const form = formidable(options);

    const reqBody = await request.formData();

    return NextResponse.json(
      { status: "success", message: "Product Added", data: reqBody },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
