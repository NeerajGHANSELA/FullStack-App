'use client';

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import { React, useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function MeetingSetup({ setisSetupComplete }) {

    const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false);
    const call = useCall();

    if (!call) throw new Error("useCall must be used within StreamCall component.")

    useEffect(() => {
        if (isMicCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggleOn, call?.camera, call.microphone])
    return (
        <div className='flex flex-col h-screen w-full  items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'> Setup </h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type="checkbox"
                        checked={ isMicCamToggleOn }
                        onChange={ (e) => setisMicCamToggleOn(e.target.checked) }
                    />
                    Join with mic and camera off
                </label>

                <DeviceSettings/ >
            </div>

            <Button 
                className='rounded-md bg-green-500 px-4 py-2.5'
                onClick={() => {
                    call.join(); 
                    setisSetupComplete(true);
                }}
            >
                Join Meeting
            </Button>
        </div>
    );
}