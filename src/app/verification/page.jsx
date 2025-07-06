'use client'

import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { VerifySchema } from '@/schemas/VerifySchema';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function verification() {

    const [ verificationCode, setVerificationCode ] = useState( new Array(6).fill('') );    // verificationCode is an array of length 6
    const inputRefs = useRef([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');  

    console.log("Username: ", username);


    // value: digit typed by the user
    function HandleChange(value, index) {
        if(/^[0-9]?$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // if the user typed something and we are not at the last input box, automatically move the cursor to the next input box if it exists.
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus(); 
            }
        }
    }

    // if the user presses the 'Backspace' key and the current input box is empty and index is greater than 0, move the cursor to the previous input box.
    // if the current input box is not empty, first delete the digit and then move the cursor to the previous box.
    function HandleKeyDown(e, index) {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        const fullCode = verificationCode.join('');
        
        // client side zod validation for the verification code
        const parsed = VerifySchema.safeParse({
            username,
            code: fullCode
        });

        if (!parsed.success) {  // if the verificationCode is invalid
            const fieldErrors = Object.fromEntries(
                Object.entries(parsed.error.flatten().fieldErrors).map( // extract error messages for each field.
                    ([key, value]) => [key, value?.[0]]
                )
            );

            console.log("Error in /verification/page.jsx: ", fieldErrors);
            return;
        }

        try {
            // call the API
            const response = await fetch('/api/verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    code: fullCode,
                })
            });

            const json = await response.json();

            // if there was an error with calling verification.
            if (!response.ok) {
                alert(json.message || "Verification failed");
                return;
            }

            alert(json.message || "verification successful");

            router.push('/userHome');   // Navigate the user to their home page.

        } catch (error) {
            alert("An unexpected error occured.");
            console.error(error);
        }
    }

    return (
        <div>
            <motion.div
                initial={{ opacity:0, scale:0.2 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.5 }}
                className='flex flex-col items-center justify-center mt-15 mb-10 md:mt-30'
            >
                <form
                    onSubmit={HandleSubmit}
                >
                    <div className='block w-full bg-neutral-100 px-15 py-9 pb-15 rounded-md shadow-2xl'>
                        <div className='flex flex-col space-y-8 items-center'>
                            <h1 className='text-bold text-2xl'>Verify your account</h1>
                            <p>Please enter your verification code:</p>

                            {/* Creating an input box for each individual digit. */}
                            <div className='flex flex-row space-x-2'>
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={ (e) => HandleChange(e.target.value, index) } 
                                        onKeyDown={ (e) => HandleKeyDown(e, index) }
                                        ref={ (el) => (inputRefs.current[index] = el) }
                                        className='w-12 h-12 text-center text-xl border-2 border-black rounded-md'
                                    />  
                                ))}
                            </div>

                            <button
                                type="submit"
                                className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700'
                            >
                                Verify
                            </button>

                            
                        </div>
                        
                    </div>
                </form>
                
            
            </motion.div>
        </div>
    )
}