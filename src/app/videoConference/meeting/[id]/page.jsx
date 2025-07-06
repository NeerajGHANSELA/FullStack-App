'use client';

import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { useGetCallbyID } from '@/hooks/useGetCallByID';
import Loader from '@/components/Loader';
import { useParams } from 'next/navigation';

export default function Meeting() {
    const { id } = useParams();
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setisSetupComplete] = useState(false);  // check whether the audio/video setup has been completed.
    const { call, isCallLoading } = useGetCallbyID(id);

    if (!isLoaded || isCallLoading) return <Loader />

    return (
        <main className='h-screen w-full'> 
            <StreamCall call={ call }>
                <StreamTheme>
                    {/* If the meeting has not been setup -> "Meeting Setup" else -> "Meeting Room"*/}
                    { !isSetupComplete ? (
                        <MeetingSetup setisSetupComplete={setisSetupComplete} />
                    ): (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>

        </main>
    );  

}