"use server";

import { headers } from "next/headers";

export const tenantResolveAction = async () => {
    const headerStore = await headers();

    const tenant = headerStore.get("X-Tenant-Context");

    console.log(tenant);

    return tenant;
};