'use client';

import { Button } from '@/components/ui/button';
import { useGetCallbyID } from '@/hooks/useGetCallByID';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner'

const Table = ({ title, description }) => {
  return (
    <div className='flex flex-col items-start gap-2 xl:flex-row'>
      <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{ title }</h1>
      <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{ description }</h1>
    </div>
  );
};

export default function PersonalRoom() {

  const { user } = useUser();
  const meetingID = user?.id;
  const client = useStreamVideoClient();
  const router = useRouter();

  const meetingLink = `https://${process.env.NEXT_PUBLIC_BASE_URL}/videoConference/meeting/${meetingID}?personal=true`;

  const { call } = useGetCallbyID(meetingID);


  const startRoom = async () => {

    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingID);

      await newCall.getOrCreate({
        data: {
            starts_at: new Date().toISOString(),
        },
      })
    }

    router.push(`/videoConference/meeting/${meetingID}?personal=true`)
  }

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'>
            Personal Room
        </h1>

        <div className='flex flex-col w-full gap-8 xl:max-w-[900px]'>
          <Table 
            title='Topic'
            description={`${user?.username}'s meeting room`}
          />

          <Table 
            title='Meeting ID'
            description={ meetingID }
          />

          <Table 
            title='Invite Link'
            description={ meetingLink }
          />
        </div>
        
        <div className='flex gap-5'>
          <Button
            onClick={ startRoom }
            className={'bg-highlight-active cursor-pointer'} 
          > 
            Start Meeting
          </Button>

          <Button
            onClick={ () => {
              navigator.clipboard.writeText(meetingLink);
              toast("Link Copied");
            }}
            className={'bg-dark3 cursor-pointer'}
          >
            Copy Invitation
          </Button>
           
        </div>
    </section>
  );
}