import { G } from "@/app/page";
import { useState } from "react";

type PageProps = {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export const FeatureCard = ({ icon, title, desc }: PageProps) => {
    const [h, setH] = useState(false);
    return (
        <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? G.bg2 : G.bg, padding: "36px 32px", transition: "background .2s" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(79,126,248,0.1)", border: "1px solid rgba(79,126,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.3rem" }}>{icon}</div>
            <h3 style={{ fontFamily: G.fontHead, fontWeight: 700, fontSize: "1.05rem", marginBottom: 10 }}>{title}</h3>
            <p style={{ color: G.muted, fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</p>
        </div>
    );
};