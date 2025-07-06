import { z } from 'zod';
import { UsernameValidation } from './LoginSchema';
import { PasswordValidation } from './LoginSchema';

// check the user's username, password, confirmPassword and email while signing up.
export const SignUpSchema = z.object({
    username: UsernameValidation,
    password: PasswordValidation,
    confirmPassword: PasswordValidation,
    email: z.string().email(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password does not match.",
});