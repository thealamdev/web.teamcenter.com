"use client";

import { G } from "@/app/page";
import { Btn } from "@/components/utils/Btn";
import { Input } from "@/components/utils/Input";
import { api } from "@/lib/api";
import { useActionState, useEffect, useState } from "react";

type FormData = {
  companyName: string;
  domain: string;
  name: string;
  email: string;
  address: string;
};

type Step = {
  label: string;
  detail: string;
  duration: number;
};

const STEPS: Step[] = [
  { label: "Creating your company", detail: "Setting up your organization profile…", duration: 1200 },
  { label: "Provisioning database", detail: "Allocating a dedicated database for your workspace…", duration: 1800 },
  { label: "Configuring workspace", detail: "Installing modules and default settings…", duration: 1400 },
  { label: "Almost there!", detail: "Redirecting you to onboarding…", duration: 800 },
];

const OnboardingOverlay = ({ subdomain }: { subdomain: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;

    const advance = () => {
      idx++;
      if (idx < STEPS.length) {
        setCurrentStep(idx);
        setTimeout(advance, STEPS[idx].duration);
      } else {
        setDone(true);
        setTimeout(() => {
          window.location.href = `http://${subdomain}.localhost:3000/onboarding`;
        }, 600);
      }
    };

    setTimeout(advance, STEPS[0].duration);
  }, [subdomain]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        width: "100%", maxWidth: 460,
        background: G.bg2,
        border: `1px solid ${G.border}`,
        borderRadius: 24,
        padding: "44px 40px",
        boxShadow: "0 32px 100px rgba(0,0,0,0.6)",
        textAlign: "center",
      }}>

        {/* Animated logo / spinner */}
        <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 28px" }}>
          <div style={{
            position: "absolute", inset: 0,
            border: `3px solid ${G.border}`,
            borderTop: `3px solid ${G.accent}`,
            borderRadius: "50%",
            animation: done ? "none" : "spin 0.9s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: 8,
            border: `2px solid transparent`,
            borderTop: `2px solid rgba(167,139,250,0.6)`,
            borderRadius: "50%",
            animation: done ? "none" : "spin 1.4s linear infinite reverse",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: done ? "1.6rem" : "1.2rem",
            transition: "font-size 0.3s",
          }}>
            {done ? "✓" : "⚡"}
          </div>
        </div>

        <h2 style={{
          fontFamily: G.fontHead, fontWeight: 800,
          fontSize: "1.4rem", letterSpacing: "-0.02em",
          marginBottom: 8,
        }}>
          {done ? "All done!" : STEPS[currentStep].label}
        </h2>

        <p style={{ color: G.muted, fontSize: "0.88rem", marginBottom: 36, minHeight: 22 }}>
          {done ? "Taking you to onboarding now…" : STEPS[currentStep].detail}
        </p>

        {/* Step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
          {STEPS.map((step, i) => {
            const isCompleted = i < currentStep || done;
            const isActive = i === currentStep && !done;

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: isActive
                  ? "rgba(79,126,248,0.08)"
                  : isCompleted ? "rgba(52,211,153,0.05)" : "transparent",
                border: `1px solid ${isActive
                  ? "rgba(79,126,248,0.25)"
                  : isCompleted ? "rgba(52,211,153,0.2)" : G.border}`,
                transition: "all 0.4s",
              }}>

                {/* Icon */}
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 700,
                  background: isCompleted
                    ? "rgba(52,211,153,0.15)"
                    : isActive ? "rgba(79,126,248,0.15)" : G.bg3,
                  color: isCompleted ? "#34d399" : isActive ? G.accent : G.muted,
                  border: `1px solid ${isCompleted
                    ? "rgba(52,211,153,0.3)"
                    : isActive ? "rgba(79,126,248,0.3)" : "transparent"}`,
                }}>
                  {isCompleted ? "✓" : i + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "0.82rem", fontWeight: 600,
                    color: isCompleted ? "#34d399" : isActive ? G.text : G.muted,
                    transition: "color 0.3s",
                  }}>
                    {step.label}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: "0.74rem", color: G.muted, marginTop: 2 }}>
                      {step.detail}
                    </div>
                  )}
                </div>

                {/* Active pulse dot */}
                {isActive && (
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: G.accent, flexShrink: 0,
                    animation: "pulse 1.2s ease-in-out infinite",
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Subdomain badge */}
        <div style={{
          marginTop: 24,
          background: G.bg3, border: `1px solid ${G.border}`,
          borderRadius: 10, padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
          <span style={{ fontSize: "0.8rem", color: G.muted }}>
            Workspace:{" "}
            <strong style={{ color: G.accent }}>{subdomain}.localhost:3000</strong>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const RegisterCompanyPage = ({ setPage }: { setPage: (p: string) => void }) => {
  const [form, setForm] = useState<FormData>({
    companyName: "", domain: "", name: "", email: "", address: "",
  });
  const [subdomain, setSubdomain] = useState<string | null>(null);

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  const set = (k: keyof FormData, v: string) => {
    const update = { ...form, [k]: v };
    if (k === "companyName") update.domain = slugify(v);
    setForm(update);
  };

  const handleSubmit = async (prevState: any, formData: globalThis.FormData) => {
    try {
      const finalData = {
        company_name: form.companyName,
        domain: form.domain,
        name: form.name,
        email: form.email,
        address: form.address,
      };
      const res = await api.post("/central/tenants/", finalData);
      if (res.status === 201) {
        setSubdomain(res.data.tenant.id); // ✅ triggers overlay
      }
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: "Something went wrong. Please try again." };
    }
  };

  const [state, action, pending] = useActionState(handleSubmit, null);

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 64 }}>

      {/* ✅ Show overlay as soon as subdomain is available */}
      {subdomain && <OnboardingOverlay subdomain={subdomain} />}

      <div style={{ flex: 1, padding: "60px 64px", overflowY: "auto", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 560, paddingBottom: 40 }} className="fd-fade-in">

          <h1 style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>
            Register your company
          </h1>
          <p style={{ color: G.muted, fontSize: "0.9rem", marginBottom: 28 }}>
            Fill in your company details to get started.
          </p>

          {state?.error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 9, padding: "12px 16px", marginBottom: 18, color: "#ef4444", fontSize: "0.85rem" }}>
              {state.error}
            </div>
          )}

          <form action={action}>
            <Input label="Company Name" required value={form.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Gazi Group" />

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 500, color: G.text, marginBottom: 8 }}>
                Domain <span style={{ color: G.accent }}>*</span>
              </label>
              <div style={{ display: "flex" }}>
                <input
                  value={form.domain}
                  onChange={(e) => set("domain", e.target.value)}
                  placeholder="gazi"
                  style={{ width: "100%", padding: "12px 14px", border: `1px solid ${G.border}`, borderRadius: "9px 0 0 9px", borderRight: "none", background: G.bg, color: G.text, outline: "none" }}
                />
                <div style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: "0 9px 9px 0", padding: "0 14px", color: G.muted, fontSize: "0.9rem", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                  .teamcenter.io
                </div>
              </div>
              {form.domain && (
                <div style={{ background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 9, padding: "12px 16px", marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: G.success, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: G.muted }}>
                    Workspace: <strong style={{ color: G.accent }}>{form.domain}.teamcenter.io</strong>
                  </span>
                </div>
              )}
            </div>

            <Input label="Full Name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ariful Haque" />
            <Input label="Email" required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="arifsajib4321@gmail.com" />
            <Input label="Address" required value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Dhanmondi 27, Dhaka, Bangladesh" />

            <Btn type="submit" disabled={pending} style={{ width: "100%", padding: 14, fontSize: "0.95rem", marginTop: 8, opacity: pending ? 0.7 : 1 }}>
              {pending ? "Submitting…" : "Continue →"}
            </Btn>
          </form>

          <p style={{ textAlign: "center", color: G.muted, fontSize: "0.78rem", marginTop: 14, lineHeight: 1.6 }}>
            By registering, you agree to TeamCenter's <a href="#" style={{ color: G.accent }}>Terms</a> and <a href="#" style={{ color: G.accent }}>Privacy Policy</a>.
          </p>
          <p style={{ textAlign: "center", color: G.muted, fontSize: "0.85rem", marginTop: 12 }}>
            Already have an account?{" "}
            <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: G.accent, cursor: "pointer", fontFamily: G.fontBody, fontSize: "0.85rem" }}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;