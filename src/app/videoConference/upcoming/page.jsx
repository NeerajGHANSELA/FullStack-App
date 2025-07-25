import CallList from '@/components/CallList';
import React from 'react';

export default function Upcoming() {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>
                Upcoming
            </h1>

            <CallList type='upcoming'/>
        </section>
    );

}