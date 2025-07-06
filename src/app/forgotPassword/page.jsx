'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { EmailValidation} from '@/schemas/EmailSchema'; 
import { useRouter } from 'next/navigation';


export default function forgotPassword() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    async function HandleSumbit(e) {
        e.preventDefault(); // Prevent the default form submission behavior.
        setErrors({}); // Reset errors.

        // send an email to the user.
        // send the link to be used by the user to reset their password.

        //client-side Zod validation
        const parsed = EmailValidation.safeParse({ email }); // validate email of the user using zod.

        if (!parsed.success) {
            const fieldErrors = Object.fromEntries(
                Object.entries(parsed.error.flatten().fieldErrors).map(
                    ([key, value]) => [key, value?.[0]]
                )
            );
            setErrors(fieldErrors);
            return;
        }

        // Email is correct. Send the email to the server to check whether the email exists or not.
        const response = await fetch('/api/forgotPassword', {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed.data),
        });

        const json = await response.json(); // wait for the response from API and parse the response body as JSON.

        if (!response.ok) {
            // Zod errors
            if (json.errors) {
                const apiErrs = Object.fromEntries(
                Object.entries(json.errors).map(
                    ([k, v]) => [k, v?._errors?.[0]]
                ))
                setErrors(apiErrs)
            } 
            // database errors
            else if (json.message) {
                if (json.message === "Email does not exist.") {
                    setErrors({ email: json.message });
                    // alert(json.message);
                } else {
                    console.error("Error in app/forgotPassword/page.jsx: ", json.message);
                }
            }
            return;
        }

        if (response.ok && !json.success) {
            console.error("Error in app/forgotPassword/page.jsx: ", json.message);
            return;
        }

        // if the response is successful, navigate the user to the reset password page.
        alert(json.message);
        router.push('/sign-in'); // Redirect the user to the sig-in page.
    }

    return(
        <motion.div
            initial={{ opacity:0, scale:0.2 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5 }}
            className='flex flex-col items-center justify-center space-y-8 mt-15 md:mt-30'
        >
            <div
                className='flex flex-col items-center justify-center text-center'
            >
                <form
                    onSubmit={HandleSumbit} 
                    className='block w-full bg-neutral-100 px-8 py-9 pb-15 rounded-md shadow-xl space-y-4'
                >
                    <h1 className='font-bold text-xl mb-10'>Forgot your password? No Worries! </h1>

                    {/* Ask the user for their email to reset their password. */}
                    <div className='flex flex-row space-x-2'>   
                        <label className='mt-1'> Enter your email: </label>

                        <input
                            type='email'
                            name="email"
                            placeholder='Enter your email'
                            required
                            onChange={ (e) => setEmail(e.target.value) }
                            className='mb-4 px-2 py-1 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Division to show the error if the email entered by the user does not match any of the emails in the backend.
                        Will only show if there is an error with the email entered by the user. */}
                    <div>
                        {errors.email && (
                            <p className='text-red-600 text-sm mb-2'>*{errors.email}*</p>
                        )}
                    </div>  

                    <button
                        type='submit'
                        className='w-1/2 h-10 ml-35 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 duration-200 font-bold cursor-pointer shadow-md'
                    >
                        Submit
                    </button>         
                </form>
            </div>
        </motion.div>
    )
}