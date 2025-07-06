import { z } from 'zod';
import { UsernameValidation } from './LoginSchema';
import { PasswordValidation } from './LoginSchema';

export const ResetPasswordSchema = z.object({
    username: UsernameValidation,
    newPassword: PasswordValidation,
    confirmPassword: PasswordValidation,
    token: z.string({
        required_error: "Token is required.",
        invalid_type_error: "Token must be a string.",
    }).min(1, {
        message: "Token cannot be empty.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords do not match.",
});
