import axios from "axios";

export const api = axios.create({
    baseURL: '',
});

api.interceptors.request.use(async (config) => {
    const tenantContext = config.headers.get('X-Tenant-Context')
    config.headers.set('X-Tenant-Context', tenantContext);
    console.log(tenantContext)
    return config;
})

