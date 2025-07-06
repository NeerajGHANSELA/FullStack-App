import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { avatarImages } from '../../constants';
import { toast } from "sonner"; 
import { cn } from "@/lib/utils";


export default function MeetingCard({ icon, title, date, isPreviousMeeting, buttonIcon1, handleClick, link, buttonText }) {
    return (
        <section 
            className='flex flex-col min-h-[258px] w-full justify-between rounded-[14px] bg-dark1 px-5 py-8 xl:max-w-[568px]'
        >
            <article className='flex flex-col gap-5'>
                <Image 
                    src={icon}
                    alt='upcoming'
                    width={ 28 }
                    height={ 28 }
                />

                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-2xl font-bold'>{title}</h1>
                        <p className='text-base font-normal'>{date}</p>
                    </div>
                </div>
            </article>

            <article className='flex justify-between items-center relative' >
             {/* {cn('flex justify-center relative', {})} */}
             {/* 'flex justify-between items-center relative' */}
                <div className='relative flex w-full max-sm:hidden'>
                    { avatarImages.map((img, index) => (
                        <Image 
                            key={ index }
                            src={ img }
                            alt='attendees'
                            width={ 40 }
                            height={ 40 }
                            className={cn('rounded-full', { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className='flex-center absolute left-[136px] w-10 h-10 rounded-full border-[5px] border-dark3 bg-dark4'>
                        +5
                    </div>
                </div>

                { !isPreviousMeeting && (
                    <div className='flex gap-2 mr-8'>
                        <Button
                            onClick={handleClick}
                            className={ 'rounded bg-highlight-active px-6 cursor-pointer' }
                        >
                            { buttonIcon1 && (
                                <Image 
                                    src={ buttonIcon1 }
                                    alt='feature'
                                    width={ 20 }
                                    height={ 20 }
                                />
                            )}
                            &nbsp; {buttonText}
                        </Button>

                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast('Link Copied');
                            }}
                            className={'bg-dark4 px-6 cursor-pointer'}
                        >
                            <Image 
                                src='/icons/copy.svg'
                                alt='feature'
                                width={ 20 }
                                height={ 20 }
                            />
                            &nbsp; Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
}