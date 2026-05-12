import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value
  const isLoginPage = req.nextUrl.pathname === "/admin/login"

  if (isLoginPage) {
    if (token === process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    return NextResponse.next()
  }

  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
