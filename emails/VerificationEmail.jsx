import {
    Html,
    Head,
    Preview,
    Text,
    Body,
    Container,
    Section
} from '@react-email/components';

// Template of the verificaiton email that will be sent to the user.
export default function VerificationEmail ({ username, verificationCode }) {
    return (
        <Html lang='en'>
            <Head>
                <title>Verification Code</title>
            </Head>
            <Preview>Your verfication code</Preview>
            <Body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
                <Section style={{ width: "100%", textAlign: "left", paddingLeft: "20px", paddingRight: "20px" }}>

                    <Container style={{ padding: "20px", borderRadius: "8px", maxWidth: "600px", margin: 0 }}>

                        <Text style={{ fontSize: "16px", marginBottom: "20px", color: "#000" }}>
                            Hi { username },
                        </Text>

                        <Text style={{ fontSize:"16px", marginBottom: "20px", color: "#000" }}>
                            Thank you for registering with InterviewPrep. Please use the following verification code to complete your registration:
                        </Text>

                        <Text style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", color: "#000" }}>
                            { verificationCode }
                        </Text>

                        <Text style={{ fontSize: "14px", color: "#000" }}>
                            Please be aware that this code will expire in 1 hour.
                        </Text>

                    </Container>

                </Section>
                
            </Body>
        </Html>
    );
}