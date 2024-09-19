import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Get token from cookies

    // Define paths that should be publicly accessible
    const publicPaths = ['/signin', '/signup'];

    // Redirect non-authenticated users trying to access protected routes
    if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    // Redirect users with a token trying to access signin or signup
    if (token && publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/workspace', request.url));
    }

    // Redirect users with a token trying to access the root path
    if (request.nextUrl.pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/workspace', request.url));
        } else {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }



    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};