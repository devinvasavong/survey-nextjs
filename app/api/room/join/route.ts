import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST /api/room/join");

    const body = await req.json();
    const { roomId } = body;

    if (!roomId) {
        return new NextResponse(JSON.stringify({ error: "Missing roomId" }))
    }

    

}