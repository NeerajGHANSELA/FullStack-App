import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { Button } from "./ui/button";

// Meeting modal is shadcn Dialog. Window overlaid on primary window.
export default function MeetingModal({ isOpen, onClose, title, className, buttonText, handleClick, children, image, buttonIcon }) {

    const classes = `text-3xl font-bold leading-[42px] ${className}`;
    return (
        <Dialog
            open={ isOpen } // Open the dialog when isOpen is true (New meeting has been clicked)
            onOpenChange={ onClose }
        >
            <DialogTitle>
                <VisuallyHidden>Meeting Modal</VisuallyHidden>
            </DialogTitle>
            <DialogContent
                className="flex flex-col w-full max-w-[520px] gap-6 border-none bg-dark2 px-6 py-9 text-white"
            >
                <div
                    className="flex flex-col gap-6"
                >
                    { image && (
                        <div className="flex justify-center">
                            <Image 
                                src={ image }
                                alt="checked"
                                width={ 72 }
                                height= { 72 }
                            />
                        </div>
                    )}
                    
                    <h1 className={ classes }>{ title }</h1>
                    { children }
                    <Button 
                        className='bg-join-meeting focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out'
                        onClick={ handleClick}    
                    >
                        { buttonIcon && (
                            <Image 
                                src={ buttonIcon }
                                alt="button icon"
                                width={ 13 }
                                height={ 13 }
                            />
                        )} &nbsp;
                        { buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
                
            </DialogContent>
        </Dialog>
    );
}
