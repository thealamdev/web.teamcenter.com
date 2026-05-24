import axios from "axios";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use(async (config) => {
    const tenantContext = config.headers.get('X-Tenant-Context')
    config.headers.set('X-Tenant-Context', tenantContext);
    
    return config;
});