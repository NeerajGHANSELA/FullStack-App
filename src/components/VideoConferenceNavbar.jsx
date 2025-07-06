'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";

export default function VideoConferenceNavbar() {
    return(
        <nav className="flex flex-between fixed z-50 w-full bg-dark1 px-6 py-4 lg:px-10">
            {/* Logo will act as a navigation to the home page. */}
            <Link
                href='/videoConference/homePage'
                className="flex items-center gap-1"
            >
                <Image
                    src='/logo.png'
                    width={ 60 }
                    height= { 60 }
                    alt="Yoom logo"
                    className="max-sm:size-10"  // make the logo bigger for screens upto smaller than 640px
                />

                <p className="text-[26px] font-extrabold text-white max-sm:hidden ml-2">
                    InterviewPrep
                </p>
            </Link>

            <div className="flex-between gap-5">
                <MobileNav />
            </div>

        </nav>
    );
}