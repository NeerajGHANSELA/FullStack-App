import { NextResponse } from 'next/server';
import { LoginSchema }  from '@/schemas/LoginSchema';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/UserModel';
import bcrypt from 'bcrypt'

/** @type {import('mongoose').Document & {
 * username: string,
 * password: string,
 * email: string,
 * isVerified: boolean
 * }} */

export async function POST(request) {
    const body = await request.json();

    // run Zod validation
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.format() },
            { status: 400 }
        );
    }

    const { username, password } = parsed.data;
    
    // check whether the user exists from the database
    try {
        // connect to the database
        await dbConnect();

        // find the user by their username.
        const user = await User.findOne({ username }).select('+password');  // get the password to be returned.

        // if the user was not found
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password." },
                { status: 401 }
            );
        }
        
        // the user was found in the database.
        // Check whether the user is verified or not
        if (!user.isVerified) {
            return NextResponse.json(
                { success: false, message: "User is not verified."},
                { status: 403 }
            );
        }

        // the user was found in the database and is verified.
        // Compare the passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // if the password does not match.
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid username or password." },
                { status: 401 }
            );
        }

        // If the username and password match with the one in the database.
        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error in api/login/route.js: ", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}