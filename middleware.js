import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"


export async function middleware(req) {
    // token will exist if user if logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl
    // allow the request if the following is true
    // if it's a request for auth or the token exists

    const followStr = pathname.slice(pathname.indexOf('/')+1, pathname.length-1);
   
    // Request to the Home page
    if (followStr.length === 0) {
        if (!token && pathname !== '/login') {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            console.log(new URL('/login', req.url));
            return NextResponse.redirect(url);
        } else if (token) {
            return NextResponse.next();
        }
    } 
    
    if (pathname === '/login') {
        if (token) {
            const url = req.nextUrl.clone()
            url.pathname = '/'
            console.log(new URL('/', req.url));
            return NextResponse.redirect(url);
        } else if (token) {
            return NextResponse.next();
        }
    }
}