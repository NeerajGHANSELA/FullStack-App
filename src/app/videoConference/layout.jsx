// layout for the VideoConference which is different from the main layout.

'use client';

import '@/app/globals.css';
import VideoConferenceNavbar from '@/components/VideoConferenceNavbar';
import VideoConferenceSidebar from '@/components/VideoConferenceSidebar';
import StreamVideoProvider from '@/providers/StreamClientProvider';


export default function VideoConferenceLayout({ children }) {
  return (
    <>
      <StreamVideoProvider>
        {/* background is fixed behind everything. */}
        <div className="fixed inset-0 bg-dark2 -z-10" />

        {/* page content. */}
        <div className="relative z-0 -mx-6 -mt-4">
          <VideoConferenceNavbar />
          <div className="flex flex-row">
            <VideoConferenceSidebar />
            <section className="flex-1 min-h-screen px-6 pb-6 mt-28 max-md:pb-14 sm:px-14">
              {children}
            </section>
          </div>
        </div>
      </StreamVideoProvider>
    </>
  );
}