import {
    Html,
    Head,
    Preview,
    Text,
    Body,
    Container,
    Section
} from '@react-email/components';

// Template of the forgot password email that will be sent to the user.
export default function ForgotPasswordEmail({ username, resetLink }) {
    return (
        <Html lang='en'>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <Preview>Your reset password link</Preview>
            <Body style={{ fontFamily: "Arial, sans-serif", margin:0, padding:0 }}>
                <Section style={{ width:"100%", textAlign:"left", paddingLeft:"20px", paddingRight:"20px" }}>

                    <Container style={{ padding:"20px", borderRadius:"8px", maxWidth:"600px", margin:0 }}>
                        <Text style={{ fontSize:"16px", marginBottom:"20px", color:"#000" }}>
                            Hi { username },
                        </Text>

                        <Text style={{ fontSize:"16px", marginBottom:"20px", color:"#000" }}>
                            If you have forgotten your password, please click the following link to reset your password:
                        </Text>

                        <Text style={{ fontSize:"16px", marginBottom:"20px", color:"#000" }}>
                            { resetLink }
                        </Text>

                        <Text style={{ fontSize:"14px", color:"#000" }}>
                            If this does not concern you, please ignore this email.
                        </Text>

                    </Container>

                </Section>

            </Body>
        </Html>
    );
}