import { z } from 'zod';

export const UsernameValidation = z
    .string()
    .min(3, { message: "Username must be at least 3 characters long."})
    .max(40, { message: "Username must be at most 40 characters long."})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and an underscore"})   // the pattern of the username.

export const PasswordValidation = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long."})

    // Check the user's username and password while logging in.
export const LoginSchema = z.object({
    username: UsernameValidation,
    password: PasswordValidation,
})