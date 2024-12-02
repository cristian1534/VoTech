import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const email = req.cookies.get("email")?.toString();
  const token = req.cookies.get("token")?.toString();
  const paymentCompleted = req.cookies.get("paymentCompleted");
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/dashboard")) {
    if (email !== "admin@votech.com" || !token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.startsWith("/signup") && !paymentCompleted) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signup"],
};
