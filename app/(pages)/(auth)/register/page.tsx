"use client";

import { G } from "@/app/page";
import { Btn } from "@/components/utils/Btn";
import { Input } from "@/components/utils/Input";
import { api } from "@/lib/api";
import { useActionState, useState } from "react";

async function registerAction(
    _prev: { error: string | null; success: boolean },
    formData: FormData
) {
    const payload = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        password_confirmation: formData.get("password_confirmation") as string,
    };

    try {
        const res = await api.post("/auth/register", payload);

        if (res.data.success) {
            const token = res.data.token;
            const subdomain = window.location.hostname.split(".")[0];

            // ✅ Save token to cookie (accessible across subdomain pages)
            document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

            // ✅ Redirect to dashboard on the same subdomain
            window.location.href = `http://${subdomain}.localhost:3000/dashboard`;
        }

        return { error: null, success: true };
    } catch (err: any) {
        return {
            error: err?.response?.data?.message ?? "Registration failed. Please try again.",
            success: false,
        };
    }
}

const RegisterPage = ({
    setPage,
    tenant,
}: {
    setPage: (p: string) => void;
    tenant: string;
}) => {
    const [state, formAction, isPending] = useActionState(registerAction, {
        error: null,
        success: false,
    });

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const pwStrength = (pw: string) => {
        let s = 0;
        if (pw.length >= 8) s++;
        if (/[A-Z]/.test(pw)) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^A-Za-z0-9]/.test(pw)) s++;
        const levels = [
            null,
            { w: "25%", c: "#f87171", t: "Weak" },
            { w: "50%", c: "#fbbf24", t: "Fair" },
            { w: "75%", c: "#60a5fa", t: "Good" },
            { w: "100%", c: "#34d399", t: "Strong" },
        ];
        return pw.length === 0 ? null : levels[Math.max(1, s)];
    };

    const str = pwStrength(password);
    const passwordsMatch = passwordConfirm.length > 0 && password === passwordConfirm;
    const canSubmit = agreed && passwordsMatch && !isPending;

    return (
        <div
            style={{
                minHeight: "100vh", display: "flex",
                alignItems: "center", justifyContent: "center",
                padding: "100px 24px 48px", position: "relative",
            }}
        >
            {/* Background glows */}
            <div style={{ position: "fixed", top: "-150px", right: "-100px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,126,248,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "fixed", bottom: "-150px", left: "-100px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div
                className="fd-fade-in"
                style={{
                    width: "100%", maxWidth: 460,
                    background: G.bg2, border: `1px solid ${G.border}`,
                    borderRadius: 20, padding: "44px 40px",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                    position: "relative", zIndex: 1,
                }}
            >
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(79,126,248,0.1)", border: "1px solid rgba(79,126,248,0.2)", color: G.accent, padding: "4px 14px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, marginBottom: 16 }}>
                        Step 2 of 2
                    </div>
                    <h1 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: 8 }}>
                        Create your account
                    </h1>
                    <p style={{ color: G.muted, fontSize: "0.9rem" }}>
                        You're almost there. Set up your personal login.
                    </p>
                </div>

                {/* Success banner */}
                {state.success && (
                    <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", borderRadius: 10, padding: "10px 14px", fontSize: "0.85rem", marginBottom: 18 }}>
                        ✓ Account created! Redirecting to workspace…
                    </div>
                )}

                {/* Error banner */}
                {state.error && (
                    <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", borderRadius: 10, padding: "10px 14px", fontSize: "0.85rem", marginBottom: 18 }}>
                        {state.error}
                    </div>
                )}

                {/* Form */}
                <form action={formAction}>
                    {/* Hidden tenant field — picked up by the action */}
                    <input type="hidden" name="tenant" value={tenant} />

                    <Input label="Full Name" required name="name" placeholder="Jane Smith" />
                    <Input label="Work Email" required name="email" type="email" placeholder="jane@acme.com" />

                    {/* Password */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: G.text, marginBottom: 8 }}>
                            Password <span style={{ color: G.accent }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                name="password"
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                required
                                style={{ paddingRight: 44 }}
                            />
                            <button type="button" onClick={() => setShowPw((p) => !p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: "1rem", padding: 0 }}>
                                {showPw ? "🙈" : "👁"}
                            </button>
                        </div>
                        {str && (
                            <div style={{ marginTop: 8 }}>
                                <div style={{ height: 3, borderRadius: 2, background: G.bg3, overflow: "hidden", marginBottom: 4 }}>
                                    <div style={{ height: "100%", width: str.w, background: str.c, borderRadius: 2, transition: "width .3s, background .3s" }} />
                                </div>
                                <span style={{ fontSize: "0.75rem", color: str.c }}>{str.t}</span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: G.text, marginBottom: 8 }}>
                            Confirm Password <span style={{ color: G.accent }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                name="password_confirmation"
                                type={showConfirm ? "text" : "password"}
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Re-enter your password"
                                required
                                style={{
                                    paddingRight: 44,
                                    borderColor: passwordConfirm.length > 0
                                        ? (passwordsMatch ? "rgba(52,211,153,0.5)" : "rgba(248,113,113,0.5)")
                                        : undefined,
                                }}
                            />
                            <button type="button" onClick={() => setShowConfirm((p) => !p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: "1rem", padding: 0 }}>
                                {showConfirm ? "🙈" : "👁"}
                            </button>
                        </div>
                        {passwordConfirm.length > 0 && (
                            <span style={{ fontSize: "0.75rem", color: passwordsMatch ? "#34d399" : "#f87171", marginTop: 4, display: "block" }}>
                                {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                            </span>
                        )}
                    </div>

                    {/* Terms */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 22 }}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
                        />
                        <label style={{ color: G.muted, fontSize: "0.82rem", lineHeight: 1.5 }}>
                            I agree to the <a href="#" style={{ color: G.accent }}>Terms of Service</a> and <a href="#" style={{ color: G.accent }}>Privacy Policy</a>.
                        </label>
                    </div>

                    <Btn
                        type="submit"
                        disabled={!canSubmit}
                        style={{ width: "100%", padding: 13, fontSize: "0.95rem", marginBottom: 16 }}
                    >
                        {isPending ? "Creating Account…" : "Create Account & Go to Workspace →"}
                    </Btn>
                </form>

                <p style={{ textAlign: "center", color: G.muted, fontSize: "0.85rem" }}>
                    Already have an account?{" "}
                    <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: G.accent, cursor: "pointer", fontFamily: G.fontBody, fontSize: "0.85rem" }}>
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;