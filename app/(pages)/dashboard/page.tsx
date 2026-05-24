"use client";

import { G } from "@/app/page";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    profile_photo_url: string;
};

const DashboardPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get("/auth/user")
            .then((res) => setUsers(res.data.data))
            .catch((err) => setError(err?.response?.data?.message ?? "Failed to fetch users."))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = () => {
        // Clear auth cookie
        document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
        window.location.href = "/register";
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: G.fontBody, padding: "48px 24px", position: "relative" }}>

            {/* Background glows */}
            <div style={{ position: "fixed", top: "-150px", right: "-100px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,126,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "fixed", bottom: "-150px", left: "-100px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>

                {/* Top bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                    <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,126,248,0.1)", border: "1px solid rgba(79,126,248,0.2)", color: G.accent, padding: "4px 14px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, marginBottom: 12 }}>
                            Dashboard
                        </div>
                        <h1 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-0.02em", marginBottom: 4 }}>
                            Team Members
                        </h1>
                        <p style={{ color: G.muted, fontSize: "0.88rem" }}>
                            {users.length > 0 ? `${users.length} users registered in this workspace` : "Loading workspace users…"}
                        </p>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            background: "rgba(248,113,113,0.08)",
                            border: "1px solid rgba(248,113,113,0.25)",
                            color: "#f87171", borderRadius: 10,
                            padding: "10px 18px", fontSize: "0.85rem",
                            fontWeight: 600, cursor: "pointer",
                            fontFamily: G.fontBody,
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(248,113,113,0.15)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
                    >
                        <span>⎋</span> Logout
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, color: G.muted, padding: "40px 0" }}>
                        <div style={{ width: 18, height: 18, border: `2px solid ${G.border}`, borderTop: `2px solid ${G.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        Fetching users…
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", borderRadius: 10, padding: "12px 16px", fontSize: "0.85rem" }}>
                        {error}
                    </div>
                )}

                {/* User cards */}
                {!loading && !error && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                style={{
                                    background: G.bg2,
                                    border: `1px solid ${G.border}`,
                                    borderRadius: 16,
                                    padding: "24px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                    transition: "border-color 0.2s, transform 0.2s",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(79,126,248,0.4)";
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = G.border;
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                }}
                            >
                                {/* Avatar + name */}
                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                    <img
                                        src={user.profile_photo_url}
                                        alt={user.name}
                                        width={48}
                                        height={48}
                                        style={{ borderRadius: "50%", border: `2px solid ${G.border}`, flexShrink: 0 }}
                                    />
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {user.name}
                                        </div>
                                        <div style={{ color: G.muted, fontSize: "0.78rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {user.email}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div style={{ height: 1, background: G.border, marginBottom: 16 }} />

                                {/* Meta rows */}
                                {[
                                    { label: "ID", value: `#${user.id}` },
                                    { label: "Verified", value: user.email_verified_at ? "✓ Yes" : "✗ No", color: user.email_verified_at ? "#34d399" : "#f87171" },
                                    { label: "Joined", value: formatDate(user.created_at) },
                                ].map(({ label, value, color }) => (
                                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                        <span style={{ color: G.muted, fontSize: "0.78rem" }}>{label}</span>
                                        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: color ?? G.text }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default DashboardPage;