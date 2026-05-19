import { NextRequest, NextResponse } from "next/server";

const resolveTenant = (request: NextRequest) => {
    const HOST = request.headers.get('host') || "";
    const hostname = HOST.split(":")[0];
    const parts = hostname.split(".");
    let tenant: string = '';
    if (parts.length > 1) {
        tenant = parts[0];
    }

    return tenant;
}

export const middleware = (request: NextRequest) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
        "X-Tenant-Context",
        resolveTenant(request)
    );

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        '/'
    ]
}