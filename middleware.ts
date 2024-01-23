import {authMiddleware} from '@clerk/nextjs'

//this example protects all routes including api/... routes
export default authMiddleware({});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}