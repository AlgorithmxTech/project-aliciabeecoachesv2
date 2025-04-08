import { requestPasswordResetService } from "@/servies/auth.services";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await requestPasswordResetService(data)
        return NextResponse.json({message:"Request sent to your email"},{status:200})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 400 }
          );
    }

}