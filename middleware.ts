// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import { type NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'
import { updateSession } from '@/utils/supabase/middleware'

type Environment = "production" | "development" | "other";

export async function middleware(req: NextRequest) {
  const currentEnv = process.env.NODE_ENV as Environment;

  if (currentEnv === 'production' && req.headers.get("x-forwarded-proto") != undefined && 
      req.headers.get("x-forwarded-proto")!.indexOf("https") !== -1) {
      return NextResponse.redirect(
        `https://${req.headers.get('host')}${req.nextUrl.pathname}${req.nextUrl.search}`
        , 301);
  } 
  // const headers = new Headers(req.headers);
  // const res = NextResponse.next({ headers });
  const res =  await updateSession(req)
  // let headers = res.headers
  // headers.set("x-current-path", req.nextUrl.pathname);
  return res
}


// export async function middleware(req: NextRequest) {
//   const currentEnv = process.env.NODE_ENV as Environment;

//   if (currentEnv === 'production' && req.headers.get("x-forwarded-proto") != undefined && 
//       req.headers.get("x-forwarded-proto")!.indexOf("https") !== -1) {
//       return NextResponse.redirect(
//         `https://${req.headers.get('host')}${req.nextUrl.pathname}${req.nextUrl.search}`
//         , 301);
//   } 

//   const headers = new Headers(req.headers);
//   headers.set("x-current-path", req.nextUrl.pathname);
//   const res = NextResponse.next({ headers });
//   const supabase = createMiddlewareClient<Database>({ req, res })
//   await supabase.auth.getSession()
//   return res
// }

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
      // matcher: ['/', '/admin'],
};
