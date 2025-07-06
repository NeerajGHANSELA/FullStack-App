'use client';

import { useGetCalls } from '@/hooks/usegetCalls';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { toast } from 'sonner';

// Component that gets used to either create upcoming page or recordings page or previous page.

/**
 * @typedef { 'ended' | 'upcoming' | 'recordings' } CallListType
 * @param {{ type: CallListType }} props 
 */
export default function CallList({ type }) {

    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setrecordings] = useState([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
                
            case 'recordings':
                return recordings

            case 'upcoming':
                return upcomingCalls;

            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No previous calls";
                
            case 'recordings':
                return "No recordings"

            case 'upcoming':
                return "No upcoming calls";

            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {

            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()));

                const recordings = callData
                    .filter( call => call.recordings.length > 0 )
                    .flatMap(call => call.recordings)  // used to convert the nested array into one array
    
                    setrecordings(recordings);
            } catch (error) {
                toast('Try again later');
            }
            
        }

        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings])

    let iconPath;
    if (type === 'ended') {
        iconPath = '/icons/previous.svg';
    } else if (type == 'upcoming') {
        iconPath = '/icons/upcoming.svg';
    } else {
        iconPath = '/icons/recordings.svg';
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            { calls && calls.length > 0 ? calls.map((meeting) => (
                <MeetingCard 
                    key={ meeting.id }
                    icon={ iconPath } 
                    title={ meeting?.state?.custom?.description?.substring(0, 26) || 'No description' }
                    date={ meeting?.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString() }
                    isPreviousMeeting={ type === 'ended' }
                    buttonIcon1={ type === 'recordings' ? '/icons/play.svg' : undefined }
                    buttonText={ type === 'recordings' ? 'Play' : 'Start' }
                    handleClick={ type === 'recordings' ? () => {
                        router.push(`${meeting.url}`)
                    } : () => {
                        router.push(`/videoConference/meeting/${meeting.id}`)
                    }}
                    link={ type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/videoConference/meeting/{meeting.id}`}
                    
                />
            )) : (
                <h1 className='text-xl text-rose-50 leading-relaxed tracking-[0.079em]'>{noCallsMessage}</h1>
            )}
        </div>
    );
} 