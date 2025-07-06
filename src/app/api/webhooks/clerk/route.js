// Webhook endpoint for Clerk. 
// Clerks POST will be sent to this url whenever events happen in Clerk application (sign-in / sign-up etc)

import { Webhook } from 'svix'; // used to verify that incoming webhooks trylu are from Clerk.
import { headers } from 'next/headers'; // allows to access HTTP headers
import { NextResponse } from 'next/server';

import UserModel from '@/models/UserModel';
import { dbConnect } from '@/lib/dbConnect';

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;  // retrieving Clerk Webhook Signing Secret

export async function POST(req) {
    if(req.method !== 'POST') {
        return new NextResponse(
            "Method not allowed", 
            { status: 405 }
        );
    }

    // get the raw body of the request
    const rawBody = await req.text();   // reading the request body as a string.
    const headersList = await headers();    // contains all the request headers.

    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing Svix headers for webhook verification.');
        return new NextResponse(
            'Error occured -- no svix headers', 
            { status: 400 }
        );
    } 

    // if the signing secret has not been set.
    if (!CLERK_WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET environment variable is not set.');
        return new NextResponse('Server configuration error', { status: 500 });
    }

    const webhook = new Webhook(CLERK_WEBHOOK_SECRET);  // creating an instance of webhook

    let event;
    try {
        // verify webhook's signature.
        event =  await webhook.verify(rawBody, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (error) {
        console.error('Error verifying webhook:', error.message);
        return new NextResponse('Error occured -- webhook verification failed', {
            status: 400
        });
    }

    const { type, data } = event;

    await dbConnect();
    console.log("DATABASE CONNECTED FROM WEBHOOK");

    if (type === 'user.created') {
        // if the user signs-up
        try {
            const newUser = { 
                ClerkID: data.id,
                username: data.username || data.email_addresses[0]?.email_address.split('@')[0] || `user_${data.id.substring(0, 8)}`,
                email: data.email_addresses[0]?.email_address,
                fullname: `${data.first_name} ${data.last_name}`,
                isVerified: data.email_addresses[0].verification.status === 'verified',
            };

            const createdUser = await UserModel.create(newUser);

            return NextResponse.json(
                { success: true, message: "User has been created and saved in the database successfully" },
                { status: 201 },
            )
            
        } catch (error) {
            return new NextResponse(`Error processing user.created: ${error.message}`, { status: 500 });
        }

    } else if (type === 'user.updated') {
        // if the user updates their profile
        try {
            const updatedFields = {
                username: data.username || data.email_addresses[0]?.email_address.split('@')[0] || `user_${data.id.substring(0, 8)}`,
                email: data.email_addresses[0]?.email_address,
                fullname: `${data.first_name} ${data.last_name}`,
                isVerified: data.email_addresses[0].verification.status === 'verified',
            };

            const updatedUser = await UserModel.findOneAndUpdate(
                { ClerkID: data.id },
                { $set: updatedFields },
                { new: true, runValidators: true }
            );

            if (updatedUser) {
                return NextResponse.json(
                    { success: true, message: "User's information has been updated successfully." },
                    { status: 200 },
                );
            } else {
                return NextResponse.json(
                    { success: false, message: "Failed to update user's information." },
                    { status: 404 },
                );
            }
        } catch (error) {
            return new NextResponse(
                `Error processing user.updated: ${error.message}`, 
                { status: 500 }
            );
        }

    } else if (type === 'user.deleted') {
        // if the user deletes their profile
        try {
            const deletedUser = await UserModel.deleteOne({ ClerkID: data.id });

            if (deletedUser.deletedCount > 0) {
                console.log("user deleted from the database", data.id);
                return NextResponse.json(
                    { success: true, message: "User has been deleted successfully." },
                    { status: 200 },
                );
            } else {
                return NextResponse.json(
                    { success: false, message: "User was not found in the database." },
                    { status: 404 },
                );
            }
        } catch (error) {
            return new NextResponse(
                `Error processing user.deleted: ${error.message}`, 
                { status: 500 }
            );
        }
    }
    // Default return for any unhandled webhook event types
    return new NextResponse('Webhook received and acknowledged', { status: 200 });

}