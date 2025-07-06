import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { VerifySchema } from "@/schemas/VerifySchema";
import { dbConnect } from '@/lib/dbConnect';
import UserModel from "@/models/UserModel";


export async function POST(request) {
    const body = await request.json();  // extract the body of the request.

    // run zod validation
    const parsed = VerifySchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.format() },
            { status: 400 }
        );
    }

    try {
        // connect to he database
        await dbConnect();

        const { username, code } = parsed.data;   // extract the verificationCode from the body of the request
        const verificationCode = code;

        // check whether there exists a user with such a username
        const userExists = await UserModel.findOne({ username });

        // if the user with such a username does not exist.
        if (!userExists) {
            return NextResponse.json(
                { success: false, message: "User does not exist." },
                { status: 409 }
            )
        }

        // if the user exists
        // compare the verificationCode entered by the user and the code that was initally assigned to the user and stored in the backend.
        const verificationCodeMatch = await bcrypt.compare(verificationCode, userExists.verificationCode); 

        if(!verificationCodeMatch) {
            return NextResponse.json(
                { success: false, message: "Verification Code does not match." },
                { status: 401 }
            )
        }

        // verificationCode matches
        userExists.isVerified = true;   // get the user to be verified in the database.
        // invalidate the used code and code expiry
        userExists.verificationCode = null;
        userExists.verificationCodeExpiry = null;

        await userExists.save();

        

        return NextResponse.json(
            { success: true, message: "User verified successfully." },
            { status: 201 }
        )

    } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { success: false, message: `Error in api/verification/route.js: ${err}`},
            { status: 500 }
        );
    }
}