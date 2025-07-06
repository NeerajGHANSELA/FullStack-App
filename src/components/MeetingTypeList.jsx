'use client';

import React from "react";
import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"; 
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ReactDatePicker from 'react-datepicker';

export default function MeetingTypeList() {

    /**
     * @type { ('isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting') | undefined } meetingState
     */
    const [meetingState, setMeetingState] = useState();
    const router = useRouter(); 
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState(
        {
            dateTime: new Date(),
            description: '',
            link: '',
        }
    );
    const [callDetails, setcallDetails] = useState();


    async function createMeeting() {
        if (!user || !client) return;

        try {
            if (!values.dateTime) {
                toast("please select date and time");
                return;
            }

            const callId = crypto.randomUUID(); // creating a random call id.
            const callType = 'default';
            const call = client.call(callType, callId); 

            if (!call) throw new Error("Failed to create a call.");
            
            const callStartingTime = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';

            console.log(values.description);

            await call.getOrCreate({
                data: {
                    starts_at: callStartingTime,
                    custom: {
                        description,
                    },
                },
            });

            setcallDetails(call);

            const msUntil = values.dateTime.getTime() - Date.now();

            if (msUntil <= 10_000) { // if the scheduled meeting is in less than 10 seconds, start the meeting now.
                router.push(`/videoConference/meeting/${call.id}`);
                toast("Meeting Created");
            } else {
                toast(`Meeting scheduled for ${values.dateTime.toLocaleString()}`);
            }                   
            
        } catch (error) {
            console.log(error);
            toast("Failed to create meeting.");
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/videoConference/meeting/${callDetails?.id}`

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard 
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-new-meeting'
            />

            <HomeCard 
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-join-meeting'
            />

            <HomeCard 
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description="Plan your meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-schedule-meeting'
            />

            <HomeCard 
                img='/icons/recordings.svg'
                title='View Recordings'
                description="Meeting recordings"
                handleClick={() => router.push('/videoConference/recordings')}
                className='bg-view-recordings'   
            />

            {/* if the call details do not exist. */}
            {!callDetails ? (
                <MeetingModal 
                    isOpen={ meetingState === 'isScheduleMeeting' }  // Open modal when user clicks on "New Meeting"
                    onClose={ () => setMeetingState(undefined) }    // when the modal is closed, reset the state to undefined
                    title="Schedule a meeting"
                    handleClick={ createMeeting }
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
                        <Textarea 
                            className={'border-none bg-dark3'}
                            onChange={ (e) => {
                                setValues({...values, description: e.target.value})
                            }}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-2.4">
                        <label className="text-base text-normal leading-[22px] text-sky-2">Select Date and Time</label>
                        <ReactDatePicker 
                            selected={ values.dateTime }
                            onChange={ (date) => setValues({...values, dateTime:date}) }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}  // 15 minutes
                            dateFormat="MMMM d, yyyy h:mm aa"   // month date, year hour:min am/pm
                            className="w-full rounded bg-dark3 p-2"
                        />

                    </div>
                </MeetingModal>
            ) : (
                // if the call details do exist
                <MeetingModal 
                    isOpen={ meetingState === 'isScheduleMeeting' }  // Open modal when user clicks on "New Meeting"
                    onClose={ () => setMeetingState(undefined) }    // when the modal is closed, reset the state to undefined
                    title="Meeting created"
                    handleClick={ () => {
                        navigator.clipboard.writeText(meetingLink);
                        toast('Link copied');
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                    className="text-center"
                />
            )}

            <MeetingModal 
                isOpen={ meetingState === 'isInstantMeeting' }  // Open modal when user clicks on "New Meeting"
                onClose={ () => setMeetingState(undefined) }    // when the modal is closed, reset the state to undefined
                title="Start an instant meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={ createMeeting }
            />

            <MeetingModal 
                isOpen={ meetingState === 'isJoiningMeeting' }  // Open modal when user clicks on "New Meeting"
                onClose={ () => setMeetingState(undefined) }    // when the modal is closed, reset the state to undefined
                title="Please enter the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={ () => router.push(values.link) }
            >
                <Input 
                    placeholder= "Meeting Link"
                    className={'bg-dark3 border-1 focus-visible:ring-1 focus-visible:ring-offset-1'}
                    onChange={ (e) => setValues({...values, link:e.target.value}) }
                />
            </MeetingModal>

        </section>  
    );
}