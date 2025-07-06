import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// all the routes in which the user must be signed in before accessing.
const protectedRoutes = createRouteMatcher([
  '/userHome',
  '/videoConference/homePage',
  '/videoConference/meeting(.*)',
  '/videoConference/personalRoom',
  '/videoConference/previous',
  '/videoConference/recordings',
  '/videoConference/upcoming',
]);

// export default clerkMiddleware(async (auth, req) => {
//   console.log(`Middleware running for ${req.nextUrl.pathname}`);
//   console.log("Clerk saw userId =", auth.userId)  // undefined if not signed in

//   if (protectedRoutes(req)) await auth.protect();
  
// });

export default clerkMiddleware(
  {
    publicRoutes: [
      '/',
      '/forgotPassword(.*)',
      '/resetPassword(.*)',
      '/sign-in(.*)',
      '/sign-up(.*)',
      '/verification(.*)',
    ],
    // This will run automatically
    afterAuth(auth, req) {
      console.log(`Middleware running for ${req.nextUrl.pathname}`);
      console.log("Clerk saw userId =", auth.userId);

      // if the requested route is one of the protectedRoutes and the user is not logged in.
      if (protectedRoutes(req) && !auth.userID) {
        auth.protect();
      }
    }
  }
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}