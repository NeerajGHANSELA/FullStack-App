'use client';

import { SignUp } from "@clerk/nextjs";
import { motion } from 'framer-motion';

export default function SignUpPage() {
    return (
        <motion.main 
            initial={{ opacity:0, scale:0.2 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.5 }}
            className="flex-center h-screen w-full"
        >
            <SignUp />
        </motion.main>
    );
}