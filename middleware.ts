import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isPublicRoute = createRouteMatcher([
   '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
])

export default clerkMiddleware(async (auth:any, request:any) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/upcoming',
//   '/meeting(.*)',
//   '/previous',
//   '/recordings',
//   '/personal-room',
// ]);

// export default clerkMiddleware((auth: any, req: any) => {
//   if (!isPublicRoute(request)) 
//     await auth.protect()
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };