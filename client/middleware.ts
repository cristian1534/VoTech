import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 
  const url = req.nextUrl.clone();

  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
