import React from 'react'
import '@/app/globals.css'
import { sidebarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';

export default function VideoConferenceSidebar() {

    const pathName = usePathname();

    return (
        <section className='sticky left-0 top-0 flex flex-col h-screen w-fit justify-between bg-dark1
            p-6 pt-28  text-white max-sm:hidden lg:w-[264]'
        >
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);    
                    // Whichever page is active, it will highlight the link
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={ `flex gap-4 items-center p-4 rounded-lg justify-start` + (isActive ? ` bg-highlight-active` : ``) }
                        >
                            <Image 
                                src={ link.imgUrl }
                                alt={ link.label }
                                width={ 24 }
                                height={ 24 }
                            />
                            <p className='text-lg font-semibold max-lg:hidden'>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}

            </div>
        </section>
    );
}