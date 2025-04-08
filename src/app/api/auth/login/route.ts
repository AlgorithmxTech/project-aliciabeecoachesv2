import { loginService } from "@/servies/auth.services";
import { NextResponse } from "next/server";
import { signToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    const data = await req.json(); 

    if (!data?.email || !data?.password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await loginService(data);
    const token = await signToken(user!.id); 


    const response = NextResponse.json({ auth_token: token }, { status: 200 });


    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 24, 
    });
console.log(response)
    return response; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Unexpected server error" },
      { status: 400 }
    );
  }
}
