'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, UserButton } from '@clerk/nextjs';

export default function UserHome() {

    const router = useRouter();

    function handleClick() {
        router.push('videoConference/homePage');
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-2xl text-bold'>User's Home Page!!!</h1>
            <button 
                onClick={handleClick}
                className='block px-6 py-3 rounded-2xl bg-blue-400 cursor-pointer'>
                Check out Video Conference 
            </button>

            <h1 className='text-2xl font-bold mt-10'>User's Homepage in Progress ...</h1>
        </div>
    )
}