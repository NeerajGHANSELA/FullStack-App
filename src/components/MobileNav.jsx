'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '../../constants';
import { usePathname } from 'next/navigation';
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export default function MobileNav() {
    const pathName = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image 
                        src="/icons/hamburger.svg"
                        width={ 36 }
                        height={ 36 }
                        alt="humburger icon"
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>

                <SheetContent
                    side='right'
                    className='border-none bg-mobileNav'
                >
                    <VisuallyHidden>
                        <DialogTitle>Mobile Navigation</DialogTitle>
                    </VisuallyHidden>

                    <SheetClose asChild>
                        <Link
                            href='/videoConference/homePage'
                            className="flex items-center gap-1"
                        >
                            <Image
                                src='/logo.png'
                                width={ 32 }
                                height= { 32 }
                                alt="InterviewPrep logo"
                                className="max-sm:size-10 ml-4 mt-4"  // make the logo bigger for screens upto smaller than 640px
                            />

                            <p className="text-[26px] font-extrabold text-white max-sm:hidden ml-2 mt-2">
                                InterviewPrep
                            </p>
                        </Link>
                    </SheetClose>
                    
                    <div className='flex flex-col h-[calc(100vh-72px)] justify-between overflow-y-auto ml-4'>
                        <SheetClose asChild>
                            <section className='flex flex-col h-full gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathName === link.route;    
                                    // Whichever page is active, it will highlight the link
                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={ `flex gap-4 items-center p-4 rounded-lg w-full max-w-60` + (isActive ? ` bg-highlight-active` : ``) }
                                            >
                                                <Image 
                                                    src={ link.imgUrl }
                                                    alt={ link.label }
                                                    width={ 20 }
                                                    height={ 20 }
                                                />
                                                <p className='font-semibold max-xs:hidden'>
                                                    {link.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
}