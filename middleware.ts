import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
    //this allows all routes including api/... routes
    publicRoutes: [
        "/api/webhooks(.*)",
        '/',
        '/api/uploadthing'
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}