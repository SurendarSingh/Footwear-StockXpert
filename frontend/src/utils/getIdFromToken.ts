import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
}

export function getDataFromToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const { _id } = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
  return _id;
}
