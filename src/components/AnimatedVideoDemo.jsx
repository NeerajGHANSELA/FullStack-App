'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedVideoDemo() {
    return (
        <motion.div
          initial={{ opacity: 0, scale: 0.2, x: 200 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: false, amount: 0.2 }}
          className='justify-self-center'
        > 
          <video
            className='h-140 my-8 rounded-lg custom-shadow'
            src='/interviewPrep_Demo.mp4'
            type='video/mp4'
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
    );
}