import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import UserModel from "@/models/UserModel";
import { ResetPasswordSchema } from'@/schemas/ResetPasswordSchema';
import { dbConnect } from '@/lib/dbConnect';


export async function POST(request) {
    const body = await request.json();    // Extract the body of the request.

    const parsed = ResetPasswordSchema.safeParse(body);  // Validate the request body using Zod schema.
    if (!parsed.success) {
        return NextResponse.json(
            { success: false, errors: parsed.error.format() },
            { status: 400 }
        );
    }

    // Extract the data from the parsed data
    const { username, newPassword, token } = parsed.data;

    // connect to the database
    await dbConnect();

    // find the user by their username
    const user = await UserModel.findOne({ 
        username,
        resetTokenExpiry: { $gt: new Date() },
    });

    // if the user does not exist.
    if (!user) {
        return NextResponse.json(
            { success: false, message: 'Invalid username.' },
            { status: 400 }, 
        );
    }

    // User found, now check if the token matches
    const tokenMatches = await bcrypt.compare(token, user.resetToken);

    if (!tokenMatches) {
        console.log("token does not match")
        return NextResponse.json(
            { success: false, message: 'Invalid token.' },
            { status: 400 }
        );
    }

    // Token matches, proceed to update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;  // Update the user's password.
    user.resetToken = undefined;  // Clear the reset token.
    user.resetTokenExpiry = undefined;  // Clear the reset token expiry.

    try {
        await user.save();  // Save the updated user document.
        return NextResponse.json(
            { success: true, message: 'Password reset successfully.' },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: 'Failed to reset password.' },
            { status: 500 }
        );
    }
}