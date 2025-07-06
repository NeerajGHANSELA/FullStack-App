// import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "InterviewPrep",
  description: "App to prepare for your interview.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
