'use client';

import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { React, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import Loader from './Loader';
import { useRouter } from 'next/navigation'



export default function MeetingRoom() {

   /**
    * @typedef { 'grid' | 'speaker-left' | 'speaker-right' } callLayoutType
    */
    const [layout, setlayout] = useState('speaker-left');
    const [showParticipants, setshowParticipants] = useState(false);
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    const router = useRouter();

    if (callingState !== CallingState.JOINED) return <Loader />


    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />  //

            case 'speaker-right':
                return <SpeakerLayout 
                    participantsBarPosition='left'
                />

            default:
                return <SpeakerLayout 
                    participantsBarPosition='right'
                />
        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                
                <div className={cn(
                    'h-[calc(100vh-86px)] ml-2',
                    showParticipants ? 'show-block' : 'hide-block'
                )}
                >
                    <CallParticipantsList onClose={ () => setshowParticipants(false) }/>
                </div>
            </div>
            
            {/* Video layout and call controls. */}
            <div className='fixed bottom-0 flex w-fit items-center justify-center gap-5 flex-wrap mb-3 xl:left-[500px]'>
                <CallControls 
                    onLeave={() => router.push('/videoConference/homePage') }   // when the user clicks on the end call button, navigate the user back to the homepage.
                />

                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger
                            className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
                        >
                            {/* Rendering a layout list icon at the bottom right of the meeting room. */}
                            <LayoutList 
                                size={20} 
                                className='text-white'
                            />
                        </DropdownMenuTrigger>
                    </div>

                    
                    <DropdownMenuContent className={'border-dark1 bg-dark1 text-white'}>
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem 
                                    className={'cursor-pointer'}
                                    onClick={() => {
                                        setlayout(item.toLowerCase())
                                    }}
                                > 
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className={'border-dark1'}/>
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />
                    
                {/* Button that allows to see or hide all the participants. */}
                <button
                    onClick={() => setshowParticipants((prev) => !prev)}    // toggle it on and off based on the previous state
                >
                    <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                        <Users
                            size={20}
                            className='text-white'
                        />
                    </div>
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
}

