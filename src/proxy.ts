import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth",
    "/favicon.ico",
    "/_next",
  ];
  console.log("pathname is :", pathname);
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
}
