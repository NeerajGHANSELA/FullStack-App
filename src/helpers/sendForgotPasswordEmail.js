import { Resend } from 'resend';
import ForgotPasswordEmail from '../../emails/ForgotPasswordEmail';

export async function sendForgotPasswordEmail({ email, username, resetLink }) {
    try {
        // Connect to the Resend service. 
        console.log("Processing the resend key----------");
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log("Done processing the resend key. ");

        console.log("Sending email ...");

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Your Password',
            react: ForgotPasswordEmail({ username, resetLink }),
        })

        console.log("Resend response: ", response);

        return{ success: true, message: "Email sent successfully. ", response };
        
    } catch (error) {
        return{
            success: false,
            message: "Error in helpers/sendForgotPasswordEmail.js", error
        };
    }
}