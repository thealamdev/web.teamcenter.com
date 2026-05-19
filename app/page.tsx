"use client";

import { useEffect, useState } from "react";
import { tenantResolveAction } from "./actions/tenantResolveAction";

export default function Home() {

  const [tenant, setTenant] = useState<string>('');

  useEffect(() => {
    const fetchTenant = async () => {
      const res = await tenantResolveAction();
      setTenant(res || '')
    }
    fetchTenant()
  }, [])
  return (
    <div className="p-5">
      Tenant is : {tenant}
    </div>
  );
}
