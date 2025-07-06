'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


export default function RegisterButton() {

  const router = useRouter();

  return (
    <div className='flex justify-center'>
      <motion.button
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        className='block w-fit bg-[#c02f2f] text-white font-bold py-3 px-6 rounded-full cursor-pointer'
        onClick={() => router.push('/sign-up')}
      >
        Register Now
      </motion.button> 
    </div>
  )
}