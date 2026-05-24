"use client";

import { G } from "@/app/page";
import { Btn } from "@/components/utils/Btn";
import { Input } from "@/components/utils/Input";
import axios from "axios";
import { useActionState, useState } from "react";

type FormData = {
  companyName: string;
  domain: string;
  name: string;
  email: string;
  address: string;
};

const RegisterCompanyPage = ({
  setPage,
}: {
  setPage: (p: string) => void;
}) => {
  const [form, setForm] = useState<FormData>({
    companyName: "",
    domain: "",
    name: "",
    email: "",
    address: "",
  });

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const set = (k: keyof FormData, v: string) => {
    const update = { ...form, [k]: v };
    if (k === "companyName") {
      update.domain = slugify(v);
    }
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

      const res = await axios.post("/central/tenants/", finalData);
      console.log(res);
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: "Something went wrong. Please try again." };
    }
  };

  const [state, action, pending] = useActionState(handleSubmit, null);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        paddingTop: 64,
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "60px 64px",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            paddingBottom: 40,
          }}
          className="fd-fade-in"
        >
          <h1
            style={{
              fontFamily: G.fontHead,
              fontWeight: 800,
              fontSize: "1.6rem",
              marginBottom: 6,
            }}
          >
            Register your company
          </h1>

          <p
            style={{
              color: G.muted,
              fontSize: "0.9rem",
              marginBottom: 28,
            }}
          >
            Fill in your company details to get started.
          </p>

          {/* Error Message */}
          {state?.error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 9,
                padding: "12px 16px",
                marginBottom: 18,
                color: "#ef4444",
                fontSize: "0.85rem",
              }}
            >
              {state.error}
            </div>
          )}

          {/* Success Message */}
          {state?.success && (
            <div
              style={{
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
                borderRadius: 9,
                padding: "12px 16px",
                marginBottom: 18,
                color: G.success,
                fontSize: "0.85rem",
              }}
            >
              Company registered successfully!
            </div>
          )}

          <form action={action}>
            {/* Company Name */}
            <Input
              label="Company Name"
              required
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              placeholder="Gazi Group"
            />

            {/* Domain */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: G.text,
                  marginBottom: 8,
                }}
              >
                Domain <span style={{ color: G.accent }}>*</span>
              </label>

              <div style={{ display: "flex" }}>
                <input
                  value={form.domain}
                  onChange={(e) => set("domain", e.target.value)}
                  placeholder="gazi"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: `1px solid ${G.border}`,
                    borderRadius: "9px 0 0 9px",
                    borderRight: "none",
                    background: G.bg,
                    color: G.text,
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    background: G.bg3,
                    border: `1px solid ${G.border}`,
                    borderRadius: "0 9px 9px 0",
                    padding: "0 14px",
                    color: G.muted,
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  .teamcenter.io
                </div>
              </div>

              {form.domain && (
                <div
                  style={{
                    background: G.bg3,
                    border: `1px solid ${G.border}`,
                    borderRadius: 9,
                    padding: "12px 16px",
                    marginTop: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: G.success,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: "0.82rem", color: G.muted }}>
                    Workspace:{" "}
                    <strong style={{ color: G.accent }}>
                      {form.domain}.teamcenter.io
                    </strong>
                  </span>
                </div>
              )}
            </div>

            {/* Full Name */}
            <Input
              label="Full Name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ariful Haque"
            />

            {/* Email */}
            <Input
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="arifsajib4321@gmail.com"
            />

            {/* Address */}
            <Input
              label="Address"
              required
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Dhanmondi 27, Dhaka, Bangladesh"
            />

            <Btn
              type="submit"
              disabled={pending}
              style={{
                width: "100%",
                padding: 14,
                fontSize: "0.95rem",
                marginTop: 8,
                opacity: pending ? 0.7 : 1,
              }}
            >
              {pending ? "Submitting..." : "Continue →"}
            </Btn>
          </form>

          <p
            style={{
              textAlign: "center",
              color: G.muted,
              fontSize: "0.78rem",
              marginTop: 14,
              lineHeight: 1.6,
            }}
          >
            By registering, you agree to TeamCenter's{" "}
            <a href="#" style={{ color: G.accent }}>Terms</a> and{" "}
            <a href="#" style={{ color: G.accent }}>Privacy Policy</a>.
          </p>

          <p
            style={{
              textAlign: "center",
              color: G.muted,
              fontSize: "0.85rem",
              marginTop: 12,
            }}
          >
            Already have an account?{" "}
            <button
              onClick={() => setPage("login")}
              style={{
                background: "none",
                border: "none",
                color: G.accent,
                cursor: "pointer",
                fontFamily: G.fontBody,
                fontSize: "0.85rem",
              }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;