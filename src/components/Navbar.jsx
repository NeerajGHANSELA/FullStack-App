'use client';   // This is a client component since the Navbar needs to handle the user events

import React, { useState } from 'react' // Importing React and useState for state management
import Image from 'next/image'; // Importing Image from next/image for optimized image loading
import Link from 'next/link';   // Importing Link from next/link for client-side navigation
import { FaChevronDown} from 'react-icons/fa'; // Importing the down arrow icon from react-icons
import { motion } from 'framer-motion'; // Importing framer-motion for animations

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);    // Initally the menu button is not clicked. Used for the arrow at the top right.
    
    return (
        <motion.nav 
            initial={{opacity:0, scale:0.2}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.5}}
            className='fixed top-0 left-0 right-0 z-50 flex flex-row space-x-4 items-center justify-between bg-[#e9ecef] h-10 px-4 py-4 pt-10 pl-8 sm:pr-10 md:pr-16'
            aria-label='Main Navigation'
        >
            {/* Logo */}
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className='cursor-pointer hover:scale-105 transition-transform transform duration-200'
                />
            </Link>

            {/* Navigation Links */}
            <ul className='flex space-x-6 text-lg'>
                {/* Abou us navigation link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/about" 
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    > 
                        About Us
                    </Link>
                </motion.li>
                
                {/* Contact navigation link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/contact-us" 
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    >
                        Contact Us
                    </Link>
                </motion.li>

                {/* Pricing navigation link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/pricing" 
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    >
                        Pricing
                    </Link>
                </motion.li>

                {/* Demo navigation link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/demo" 
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    >
                        Demo
                    </Link>
                </motion.li>

                {/* Sign in link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/sign-in"
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    >
                        Login
                    </Link>
                </motion.li>

                {/* Sign up Link. */}
                <motion.li
                    whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link 
                        href="/sign-up"
                        className='inline-block hover:scale-110 hover:text-black transition-transform transform duration-200 font-normal text-[#495057]'
                    >
                        Sign-up
                    </Link>
                </motion.li>
            </ul>

        
        </motion.nav>
    );
}
