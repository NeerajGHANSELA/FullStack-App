'use client';

import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
// import { tokenProvider } from "../actions/stream.actions";
import { TokenProvider } from '@/hooks/useStreamToken';
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };


export default function StreamVideoProvider({ children }) {

    const [videoClient, setVideoClient] = useState();
    const { user, isLoaded } = useUser();   // clerk user will also be used to create a user in Stream.

    // whenver the variable in dependency array change, the function will be called.
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error("Stream API key missing");

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,   // use the username. if doesn't exist, use the id.
                image: user?.imageUrl,
            },
            tokenProvider: TokenProvider,
        });

        setVideoClient(client);
    }, [user, isLoaded]);

    if (!videoClient) return <Loader />

    return (
        <StreamVideo client={videoClient}>
            { children }
        </StreamVideo>
    );
}