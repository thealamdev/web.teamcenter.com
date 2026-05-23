import React from "react";
import { Btn } from "../utils/Btn";
import { G } from "@/app/page";

type PageType = string;

type PageProps = {
  setPage: (p: PageType) => void;
};

export default function Hero({ setPage }: PageProps) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 5% 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* background glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(79,126,248,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* badge */}
        <div
          className="fd-fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(79,126,248,0.1)",
            border: "1px solid rgba(79,126,248,0.25)",
            color: G.accent,
            padding: "6px 16px",
            borderRadius: 100,
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          ✦ Multi-tenant workspace platform
        </div>

        {/* heading */}
        <h1
          className="fd-fade-up-1"
          style={{
            fontFamily: G.fontHead,
            fontWeight: 800,
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Track work.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ship faster.
          </span>{" "}
          Together.
        </h1>

        {/* description */}
        <p
          className="fd-fade-up-2"
          style={{
            maxWidth: 560,
            margin: "0 auto 40px",
            color: G.muted,
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          TeamCenter gives your company a dedicated workspace to manage
          projects, track issues, and collaborate — all under your own domain.
        </p>

        {/* buttons */}
        <div
          className="fd-fade-up-3"
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 60,
          }}
        >
          <Btn
            onClick={() => setPage("register-company")}
            style={{ padding: "14px 32px", fontSize: "1rem" }}
          >
            Start for free →
          </Btn>

          <Btn
            onClick={() => { }}
            variant="outline"
            style={{ padding: "14px 32px", fontSize: "1rem" }}
          >
            See how it works
          </Btn>
        </div>

        {/* <DashboardPreview /> */}
      </div>
    </section>
  );
}