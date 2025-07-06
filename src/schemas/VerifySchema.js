import { z } from 'zod';
import { UsernameValidation } from './LoginSchema';

export const VerifySchema = z.object({
    username: UsernameValidation,
    code: z.string().length(6, {message: "Verification code must be 6 characters long"}),
})