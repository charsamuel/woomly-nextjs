declare module '@clerk/nextjs/server' {
    export const clerkMiddleware: (handler: any) => any;
    export const createRouteMatcher: (routes: string[]) => (req: any) => boolean;
  }
  