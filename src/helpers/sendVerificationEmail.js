import { Resend } from 'resend';
import VerificationEmail from '../../emails/VerificationEmail';


export async function sendVerificationEmail({ email, username, verificationCode }) {
    
    try {
        // Connect to the Resend service.
        console.log("Processing the resend key----------");
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log("Done processing the resend key. ");

        console.log("Sending email ...");

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({ username, verificationCode }),
        });
        console.log("Resend response: ", response);

        return { success: true, message: "Email sent successfully. ", data: response};
        
    } catch (error) {
        return { 
            success: false, 
            message: "Error in helpers/sendVerificationEmail.js", error
        };
    
    }
}

