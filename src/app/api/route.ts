import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    const searchParam = new URLSearchParams(url.search);
    const fileName = searchParam.get("audio");
    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`
    );
}
