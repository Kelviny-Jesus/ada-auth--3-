import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { session_token } = await request.json();

  if (!session_token) {
    return NextResponse.json({ error: "Session token is required" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("authToken", session_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 1296000,
    sameSite: "lax",
  });

  return response;
}
