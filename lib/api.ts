import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const parts = window.location.hostname.split(".");
        const tenant = parts.length > 1 ? parts[0] : null;

        if (tenant) {
            config.baseURL = `http://${tenant}.localhost:8000/api`;
        }

        const token = document.cookie
            .split("; ")
            .find((r) => r.startsWith("auth_token="))
            ?.split("=")[1];

        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
    }

    return config;
});