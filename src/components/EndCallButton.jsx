'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function EndCallButton() {

    const router = useRouter();
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant(); 

    // check whether the call was created by the localParticipant or not.
    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;   // if we are not the meeting owner, do not show the end call button.

    return (
        <Button
            onClick={ async () => { 
                await call.endCall();
                router.push('/videoConference/homePage');
            }}
            className={'bg-red-500 cursor-pointer'}
        >
            End call for everyone
        </Button>
    );
}