'use client';

import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ResetPasswordSchema } from '@/schemas/ResetPasswordSchema';


export default function ResetPassword() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';  // Get the token from the query parameters.
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({}); // Reset error message.

        // client side zod validation
        const parsed = ResetPasswordSchema.safeParse({ username, newPassword, confirmPassword, token });
        if (!parsed.success) {  // if the input is invalid. 
            const fieldErrors = Object.fromEntries(
                Object.entries(parsed.error.flatten().fieldErrors).map( // extract error messages for each field.
                    ([key, value]) => [key, value?.[0]]
                )
            );
            setErrors(fieldErrors); // Set the errors state with the validation errors.
            return;
        } 

        console.log("calling api")
        const response = await fetch('/api/resetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed.data), // Include the token in the request body.
        });

        const json = await response.json();

        if (!response.ok) {
            // Zod errors
            if (json.errors) {
                const apiErrs = Object.fromEntries(
                Object.entries(json.errors).map(
                    ([k, v]) => [k, v?._errors?.[0]]
                )
                )
                setErrors(apiErrs)
            }
            // database errors
            else if (json.message) {
                if (json.message === 'Invalid username.') {
                    setErrors({ username: json.message });
                    // alert(json.message);
                } else if (json.message === 'Invalid token.') {
                    setErrors({ token: json.message });
                    // alert(json.message);
                } else {
                    console.error("Error in app/sign-in/page.jsx: ", json.message);
                }
            }
            return;
        }

        if (response.ok && !json.success) {
            // setErrors({ general: json.message });
            console.error("Error in app/sign-in/page.jsx: ", json.message)
            return;
        }

        // response was successful.
        if (json.success) {
            alert(json.message);
            window.close();
        }
    }


    return (
        <motion.div
            initial={{ opacity:0, scale:0.2}}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5 }}
            className='flex flex-col items-center justify-center space-y-8 mt-15 md:mt-30'
        >
            <div
                className='flex flex-col items-center justify-center text-center'
            >
                <form
                    onSubmit={handleSubmit} 
                    className='block w-full bg-neutral-100 px-8 py-9 pb-15 rounded-md shadow-xl space-y-4'
                >
                    <h1 className='font-bold text-xl mb-10'>Reset your password!</h1>

                    {/* Ask the user for their username. */}
                    <div className='flex flex-row space-x-2 '>
                        <label className='mt-1'>username: </label>

                        <input
                            type='text'
                            name="username"
                            placeholder='Enter your username'
                            required
                            onChange={ (e) => setUsername(e.target.value) }
                            className='ml-14 mb-4 px-2 py-1 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Division to show the error if the username entered by the user does not match the requirements stated under LoginSchema.
                        Will only show if there is an error with the username entered by the user. */}
                    <div>
                        {errors.username && (
                            <p className='text-red-600 text-sm mb-2'>{errors.username}</p>
                        )}
                    </div> 

                    {/* Ask the user for their new password. */}
                    <div className='flex flex-row space-x-2'>
                        <label className='mt-1'>new password: </label>

                        <input
                            type='password'
                            name="password"
                            placeholder='Enter new password'
                            required
                            onChange={ (e) => setNewPassword(e.target.value) }
                            className='ml-6 mb-4 px-2 py-1 border border-gray-300 rounded-md'
                        />
                    </div>

                    <div>
                        {errors.newPassword && (
                            <p className='text-red-600 text-sm mb-2'>{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Ask the user to confirm their new password. */}
                    <div className='flex flex-row space-x-2'>
                        <label className='mt-1'>confirm password: </label>

                        <input
                            type='password'
                            name="confirmPassword"
                            placeholder='Confirm new password'
                            required
                            onChange={ (e) => setConfirmPassword(e.target.value) }
                            className='mb-4 px-2 py-1 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Division to show the error if the password entered by the user does not match the constraints stated under LoginSchema. 
                        Will only show if there is an error with the password entered by the user. */}
                    <div>
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                        )}
                    </div>
                    
                    {/* Display any erro related to usernam*/}
                    <div>
                        {errors.token && (
                            <p className="text-red-600 text-sm">{errors.token}</p>
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
    );
}