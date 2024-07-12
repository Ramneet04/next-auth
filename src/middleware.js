import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req){
    const path = req.nextUrl.pathname;
    console.log("pathname->>",path);
    const checkPublicPath = path === "/sign-up" || path === "/login";
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if(checkPublicPath && token !== ""){
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if(!checkPublicPath && token === ""){
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}
export const config = {
    matcher: ["/login", "/sign-up", "/dashboard"]
}