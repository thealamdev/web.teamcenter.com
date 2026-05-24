import { NextRequest, NextResponse } from "next/server";

const resolveTenant = (request: NextRequest): string => {
    const HOST = request.headers.get("host") || "";
    const hostname = HOST.split(":")[0];
    const parts = hostname.split(".");
    return parts.length > 1 ? parts[0] : "";
};

const isProtected = (pathname: string) =>
    pathname.startsWith("/dashboard");

export const middleware = (request: NextRequest) => {
    const tenant = resolveTenant(request);
    const { pathname } = request.nextUrl;

    // ✅ Guard protected routes
    if (isProtected(pathname)) {
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            // No token → redirect back to register on same subdomain
            const loginUrl = new URL("/register", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ✅ Attach tenant to request headers for server components/actions
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("X-Tenant-Context", tenant);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    response.headers.set("X-Tenant-Context", tenant);

    return response;
};

export const config = {
    matcher: [
        "/",
        "/register",
        "/register-company",
        "/dashboard/:path*",   // ✅ protect all dashboard routes
    ],
};