import React from 'react'

export default function Footer() {
    return (
        <footer 
            className='bg-black text-white py-10 mt-20'
        >
            <div
                className='w-full px-20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'
            >
                {/* Logo */}
                <div 
                    className='flex items-center justify-center mb-4 md:mb-0'
                >
                    <img 
                        src="/logo.png" 
                        alt="Logo" 
                        width={100} 
                        height={100} 
                        className='cursor-pointer hover:scale-105 transition-transform transform duration-200'
                    />
                </div>

                {/* Footer Links */}
                <div 
                    className='text-lg flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-2 md:space-y-0'
                >
                    <a href="/about" className='hover:text-gray-400 hover:scale-105'>About Us</a>
                    <a href="/contact" className='hover:text-gray-400 hover:scale-105'>Contact Us</a>
                    <a href="/pricing" className='hover:text-gray-400 hover:scale-105'>Pricing</a>
                    <a href="/demo" className='hover:text-gray-400 hover:scale-105'>Demo</a>
                </div>


            </div>


        </footer>
    );
}