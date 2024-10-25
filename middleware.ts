import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

// Middleware function
export default clerkMiddleware((auth, req) => {
  // Only protect routes that aren't public
  if (!isPublicRoute(req)) {
    return auth.protect(); // Handles async protection of protected routes
  }
});

// Configuration for Next.js routes matcher
export const config = {
  matcher: [
    // Applies middleware to all routes, except Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Always apply middleware for API routes
  ],
};
