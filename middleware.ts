import { NextRequest } from "next/server";

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
    request.headers.set('X-Tenant-Context', resolveTenant(request));
    console.log('tenant bro: ', request.headers.get('X-Tenant-Context'))
}

export const config = {
    matcher: [
        '/'
    ]
}