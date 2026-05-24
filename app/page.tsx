"use client";

import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import { Btn } from "@/components/utils/Btn";
import { useState, useEffect, ReactNode } from "react";
import { Input } from "@/components/utils/Input";
import { FeatureCard } from "@/components/utils/FeatureCard";
import { PricingCard } from "@/components/utils/PricingCard";
import { SocialBtn } from "@/components/utils/SocialBtn";
import { Divider } from "@/components/utils/Divider";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";

export const G = {
  fontHead: "'Syne', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  bg: "#0b0d11", bg2: "#111318", bg3: "#181c24", card: "#13161e",
  border: "rgba(255,255,255,0.07)", borderFocus: "rgba(79,126,248,0.5)",
  accent: "#4f7ef8", accent2: "#a78bfa",
  text: "#e8eaf0", muted: "#7b82a0",
  success: "#34d399", error: "#f87171",
};

const SocialBtns = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 4 }}>
    {[
      { icon: <GoogleIcon />, label: "Google" },
      { icon: <GithubIcon />, label: "GitHub" },
    ].map(({ icon, label }) => (
      <SocialBtn key={label} icon={icon} label={label} />
    ))}
  </div>
);

// ─── HOME PAGE ────────────────────────────────────────────────────
const HomePage = ({ setPage }: { setPage: (p: string) => void }) => (
  <div style={{ paddingTop: 64 }}>
    {/* Hero */}
    <Hero setPage={setPage} />

    {/* Stats */}
    <div style={{ padding: "80px 5%", background: G.bg2, borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 40, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        {[["12k+", "Teams on TeamCenter"], ["98%", "Customer satisfaction"], ["340M", "Tasks completed"], ["99.9%", "Uptime SLA"]].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: G.fontHead, fontSize: "2.8rem", fontWeight: 800, background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
            <div style={{ color: G.muted, fontSize: "0.9rem", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Features */}
    <section style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ color: G.accent, fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Core Platform</div>
        <h2 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.02em", marginBottom: 12 }}>Everything your team needs</h2>
        <p style={{ color: G.muted, fontSize: "1rem", maxWidth: 480, marginBottom: 60 }}>Built for modern product teams — engineered for scale, designed for humans.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 1, background: G.border, border: `1px solid ${G.border}`, borderRadius: 16, overflow: "hidden" }}>
          {[
            ["🏢", "Multi-Tenant Workspaces", "Each company gets an isolated workspace under their own subdomain with complete data separation."],
            ["📋", "Kanban & Sprint Boards", "Drag-and-drop boards with custom workflows, swimlanes, and sprint planning built in."],
            ["🔔", "Smart Notifications", "Intelligent notification grouping and do-not-disturb scheduling across all channels."],
            ["📊", "Analytics & Reporting", "Velocity charts, burndowns, cycle time — all your engineering metrics in one dashboard."],
            ["🔗", "60+ Integrations", "Connect GitHub, Slack, Figma, and more. Automate handoffs between your favourite services."],
            ["🔒", "Enterprise Security", "SOC 2 Type II, SSO, SAML 2.0, audit logs, and role-based access controls out of the box."],
          ].map(([icon, title, desc]) => <FeatureCard key={title} icon={icon} title={title} desc={desc} />)}
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section style={{ padding: "100px 5%", background: G.bg2, borderTop: `1px solid ${G.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ color: G.accent, fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Pricing</div>
        <h2 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.02em", marginBottom: 12 }}>Simple, honest pricing</h2>
        <p style={{ color: G.muted, fontSize: "1rem", marginBottom: 60 }}>No per-seat surprises. Start free and scale as you grow.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          <PricingCard plan="Starter" price="$0" period="/mo" desc="For small teams" features={["Up to 5 members", "3 active projects", "Basic boards", "2 GB storage", "Community support"]} cta="Get started free" onClick={() => setPage("register-company")} />
          <PricingCard plan="Pro" price="$19" period="/mo per workspace" desc="For growing teams" features={["Unlimited members", "Unlimited projects", "Sprint & roadmap boards", "50 GB storage", "Priority support", "Analytics"]} cta="Start free trial" onClick={() => setPage("register-company")} popular />
          <PricingCard plan="Enterprise" price="Custom" period="" desc="For large organizations" features={["Everything in Pro", "SSO / SAML 2.0", "Dedicated infra", "Custom domain", "SLA guarantee", "Dedicated CSM"]} cta="Contact sales" />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding: "120px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: `radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <h2 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.02em", marginBottom: 20, position: "relative", zIndex: 1 }}>Ready to ship<br />faster together?</h2>
      <p style={{ color: G.muted, maxWidth: 500, margin: "0 auto 40px", fontSize: "1.05rem", position: "relative", zIndex: 1 }}>Register your company in 60 seconds and invite your team. No credit card required.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <Btn onClick={() => setPage("register-company")} style={{ padding: "14px 32px", fontSize: "1rem" }}>Register your company →</Btn>
        <Btn variant="outline" onClick={() => setPage("login")} style={{ padding: "14px 32px", fontSize: "1rem" }}>Sign into workspace</Btn>
      </div>
    </section>

    {/* Footer */}
    <Footer />
  </div>
);

 

const LoginPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [workspace, setWorkspace] = useState("acme.TeamCenter.io");
  const set = (k: any, v: any) => setForm(p => ({ ...p, [k]: v }));

  const handleLogin = () => {
    setError(false); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!form.email.includes("@")) { setError(true); return; }
      alert("Login successful! Redirecting to your workspace…");
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 48px", position: "relative" }}>
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`, backgroundSize: "48px 48px", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)" }} />
      <div style={{ position: "fixed", top: "25%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(79,126,248,0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div className="fd-fade-in" style={{ width: "100%", maxWidth: 440, background: G.bg2, border: `1px solid ${G.border}`, borderRadius: 20, padding: "44px 40px", boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`, position: "relative", zIndex: 1 }}>
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.4rem", color: "#fff", margin: "0 auto 20px", boxShadow: `0 8px 24px rgba(79,126,248,0.35)` }}>F</div>
          <h1 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.65rem", letterSpacing: "-0.02em", marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: G.muted, fontSize: "0.88rem" }}>Sign in to continue to your workspace</p>
        </div>
        {/* Workspace bar */}
        <div style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.success, flexShrink: 0 }} />
          <span style={{ fontSize: "0.82rem", color: G.muted, flex: 1 }}>Workspace: <strong style={{ color: G.accent }}>{workspace}</strong></span>
          <button onClick={() => { const n = prompt("Enter workspace:", workspace); if (n) setWorkspace(n.toLowerCase().replace(/[^a-z0-9-.]/g, "-")); }} style={{ background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: G.fontBody }}>Change</button>
        </div>
        <SocialBtns />
        <Divider label="or sign in with email" />
        {error && (
          <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: G.error, padding: "10px 14px", borderRadius: 8, fontSize: "0.83rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>⚠ Invalid email or password. Please try again.</div>
        )}
        <Input label="Email address" required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@acme.com" />
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 500, color: G.text }}>Password</label>
            <a href="#" style={{ fontSize: "0.8rem", color: G.accent, textDecoration: "none" }}>Forgot password?</a>
          </div>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Enter your password" style={{ paddingRight: 44 }} />
            <button onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: G.muted, cursor: "pointer", fontSize: "1rem", padding: 0 }}>{showPw ? "🙈" : "👁"}</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: 15, height: 15 }} />
          <label style={{ color: G.muted, fontSize: "0.83rem", cursor: "pointer" }}>Keep me signed in for 30 days</label>
        </div>
        <Btn onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: 13, fontSize: "0.95rem", marginBottom: 18 }}>
          {loading ? "Signing in…" : "Sign in to workspace →"}
        </Btn>
        <p style={{ textAlign: "center", color: G.muted, fontSize: "0.85rem", marginBottom: 20 }}><a href="#" style={{ color: G.accent, textDecoration: "none" }}>Need help signing in?</a></p>
        <div style={{ textAlign: "center", paddingTop: 20, borderTop: `1px solid ${G.border}`, fontSize: "0.85rem", color: G.muted }}>
          Don't have a workspace?{" "}
          <button onClick={() => setPage("register-company")} style={{ background: "none", border: "none", color: G.accent, cursor: "pointer", fontFamily: G.fontBody, fontSize: "0.85rem", fontWeight: 500 }}>Register your company →</button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: G.fontBody }}>
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} />}
    </div>
  );
}