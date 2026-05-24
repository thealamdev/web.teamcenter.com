"use client";
import { G } from "@/app/page";
import React from "react";

export default function Onboarding() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: G.bg,
                color: G.text,
                fontFamily: G.fontBody,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 16px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    display: "grid",
                    gap: "20px",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "10px",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: G.fontHead,
                            fontSize: "36px",
                            marginBottom: "10px",
                        }}
                    >
                        Welcome to Your Workspace
                    </h1>
                    <p style={{ color: G.muted }}>
                        Get started by creating your account or logging in to continue your journey.
                    </p>
                </div>

                {/* Cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {/* Register Card */}
                    <div
                        style={{
                            background: G.card,
                            border: `1px solid ${G.border}`,
                            borderRadius: "14px",
                            padding: "20px",
                        }}
                    >
                        <h2 style={{ fontFamily: G.fontHead, marginBottom: "10px" }}>
                            🧾 Create Account
                        </h2>
                        <p style={{ color: G.muted, lineHeight: "1.6" }}>
                            Start by registering your account with your email and domain.
                            This will create your personal workspace and unlock all features.
                        </p>

                        <ul style={{ marginTop: "12px", color: G.muted }}>
                            <li>✔ Fast signup in under 1 minute</li>
                            <li>✔ Secure authentication</li>
                            <li>✔ Personalized dashboard</li>
                        </ul>

                        <button
                            onClick={() => (window.location.href = "/register")}
                            style={{
                                marginTop: "15px",
                                width: "100%",
                                padding: "10px",
                                background: G.accent,
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Register Now
                        </button>
                    </div>

                    {/* Login Card */}
                    <div
                        style={{
                            background: G.card,
                            border: `1px solid ${G.border}`,
                            borderRadius: "14px",
                            padding: "20px",
                        }}
                    >
                        <h2 style={{ fontFamily: G.fontHead, marginBottom: "10px" }}>
                            🔐 Login to Continue
                        </h2>
                        <p style={{ color: G.muted, lineHeight: "1.6" }}>
                            Already have an account? Sign in to access your dashboard,
                            manage data, and continue where you left off.
                        </p>

                        <ul style={{ marginTop: "12px", color: G.muted }}>
                            <li>✔ Secure login system</li>
                            <li>✔ Access your workspace anytime</li>
                            <li>✔ Multi-device support</li>
                        </ul>

                        <button
                            style={{
                                marginTop: "15px",
                                width: "100%",
                                padding: "10px",
                                background: G.accent2,
                                border: "none",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Login
                        </button>
                    </div>

                    {/* Info Card */}
                    <div
                        style={{
                            background: G.card,
                            border: `1px solid ${G.border}`,
                            borderRadius: "14px",
                            padding: "20px",
                        }}
                    >
                        <h2 style={{ fontFamily: G.fontHead, marginBottom: "10px" }}>
                            🚀 How it works
                        </h2>
                        <p style={{ color: G.muted, lineHeight: "1.6" }}>
                            After registration, your workspace is automatically created under
                            your subdomain. You can manage events, users, and settings from
                            your dashboard.
                        </p>

                        <div
                            style={{
                                marginTop: "12px",
                                padding: "10px",
                                background: G.bg2,
                                border: `1px solid ${G.border}`,
                                borderRadius: "10px",
                                color: G.muted,
                                fontSize: "13px",
                            }}
                        >
                            Example: <br />
                            <span style={{ color: G.accent }}>
                                yourname.yourdomain.com/dashboard
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}