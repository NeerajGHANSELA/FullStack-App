import { NextResponse } from "next/server";
import { sendForgotPasswordEmail } from "@/helpers/sendForgotPasswordEmail";
import { EmailValidation } from "@/schemas/EmailSchema";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const body = await request.json();  // Extract the body of the request.

    // run Zod validation
    const parsed = EmailValidation.safeParse(body);
    
    if(!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.format() },
            { status: 400 }
        );
    }
    // Email meets the requirements stated under EmailSchema
    // connect to the database
    await dbConnect();

    // Database connected.
    // Extract the email from the parsed.
    let { email } = parsed.data;
    email = email.trim().toLowerCase(); // Trim and lowercase the email for consistency.

    // check whether the user with the same email exists in the database.
    const userExists = await UserModel.findOne({ email });

    // if the user with the same email does not exist in the database.
    if (!userExists) {
        return NextResponse.json(
            { success: false, message: "Email does not exist." },
            { status: 404 }
        );
    }
    // User does exist.
    // Send the forgot password link to the user. Requires token and expiry to be generated.

    // Generate a token and expiry
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);
    const tokenExpiry = new Date(Date.now() + (3600 * 1000));    // token expires 1 hour from now.

    // save the token information into user's document in the database.
    userExists.resetToken = hashedToken;
    userExists.resetTokenExpiry = tokenExpiry;
    try {
        await userExists.save();
    } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { success: false, message: `Error in api/forgotPassword/route.js: ${err}`},
            { status: 500 }
        );
    }

    // Get the username of th user which is used in the email being sent to the user. Username is not encrypted.
    const username = userExists.username;

    // Build the reset link.
    const origin = process.env.DOMAIN;
    const resetLink = `${origin}/resetPassword?token=${token}`;

    // Send a forgot password email to the user.
    try {
        const emailResult = await sendForgotPasswordEmail({
            email,
            username, 
            resetLink
        })

        if (!emailResult) {
            return NextResponse.json(
                { success: false, message:"Email was found but failed to send the forgotPasswordEmail." },
                { status: 501 }
            );
        }

        // if the email was found and the email was sent successfully.
        return NextResponse.json(
            { success: true, message:"Email verified and forgot password email sent successfully." },
            { status: 200 }
        ); 

    } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { success: false, message: `Error in api/forgotPassword/route.js: ${err}`},
            { status: 500 }
        );
    }
}