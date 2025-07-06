import { NextResponse } from "next/server";
import { SignUpSchema } from '@/schemas/SignUpSchema';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from "@/models/UserModel";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

/** @type {import('mongoose').Document & {
 * username: string,
 * password: string,
 * email: string,
 * verificationCode: string,
 * verificationCodeExpiry: string,
 * isVerified: boolean
 * }} */


// function will automatically will be invoked when the client does a POST request on this route.
export async function POST(request) {
    const body = await request.json();  // extract the body of the request.

    // run Zod validation
    const parsed = SignUpSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.format() },
            { status: 400 }
        );
    }

    // connect to the database
    await dbConnect();

    // database connected. 
    const { username, password } = parsed.data;  // extract the data from the parsed object
    let { email } = parsed.data;
    email = email.trim().toLowerCase(); // Trim and lowercase the email for consistency.

    // check whether there exists a user with the same username in the database
    const usernameExists = await UserModel.findOne({ username });

    // if the username already exists but the user is not verified.
    if (usernameExists && !usernameExists.isVerified) {
        // delete the current user so the user can sign up again with the same username.
        await usernameExists.deleteOne();
    } else {
        // if the user with the same username already exists in the database
        if (usernameExists) {
            return NextResponse.json(
                { success: false, context: "Username" , message: "Username already exists." },
                { status: 409 }
            );
        }

        // check whether there exists a user with the same email in the database
        const emailExists = await UserModel.findOne({ email });

        // if the user with the same email already exists in the database.
        if (emailExists) {
            return NextResponse.json (
                { success: false, context: "Email"  , message: "Email already exists." },
                { status: 409 }
            );
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the user's password
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();    // generate a verification code of 6 characters long.
    const hashedVerificationCode = await bcrypt.hash(verificationCode, 10); // encrypt the user's verification code.
    const verificationCodeExpiry = new Date(Date.now() + (3600 * 1000));    // verfication code expires in 1 hour.

    // save the user's credentials in the database.
    try {
        // create the user document and save it.
        const user = await UserModel.create({
            username,
            password: hashedPassword,
            email,
            verificationCode: hashedVerificationCode,
            verificationCodeExpiry,
            isVerified: false,  // send the verificaitonCode to the user in order to get the user verified.
        });


        // send the verification code to the user
        try {
            const emailResult = await sendVerificationEmail({
                email,
                username,
                verificationCode,
            });

            // if the email was not sent successfully.
            if (!emailResult.success) {
                return NextResponse.json(
                    { success: false, message: "User created but failed to send the verification email." },
                    { status: 501 }
                );
            }

            // if the user has been created in the database and the email has been sent successfully.
            return NextResponse.json(
                { success: true, message: "User created and verification email sent successfully." },
                { status: 201 }
            );

        } catch (error) {
            const err = error instanceof Error ? error.message : String(error);
            return NextResponse.json(
                { success: false, message: `Error in api/signup/route.js: ${err}`},
                { status: 500 }
            );
        }
        
    } catch (error) { 
        const err = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { success: false, message: `Error in api/signup/route.js: ${err}`},
            { status: 500 }
        );
    }
}