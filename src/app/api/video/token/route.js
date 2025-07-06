import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { NextResponse } from "next/server";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export async function GET(req) {
    if (req.method !== 'GET') {
        return NextResponse.json(
            { success: false, message: 'No other requests can be taken other than GET' },
            { status: 405 }

        );
    }

    const user = await currentUser();   // get the current user from clerk.
    if (!user) {
        return NextResponse.json(
            { success: false, message: "user is not authenticated" },
            { status: 401 },
        );
    }
        
    if (!apiKey) {
        return NextResponse.json(
            { success: false, message: "Stream api not detected. from actions/stream.actions.js" },
            { status: 500 },
        );
    }
   
    if (!apiSecret) {
        return NextResponse.json(
            { success: false, message: "Stream api secret not detected. from actions/stream.actions.js" },
            { status: 500 },
        );
    }

    const client = new StreamClient(apiKey, apiSecret);
    const tokenVailidity = 60 * 60; // token is valid for one hour.

    const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: tokenVailidity });
    return NextResponse.json({ token });
}