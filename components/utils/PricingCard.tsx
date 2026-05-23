import { G } from "@/app/page";
import { Btn } from "./Btn";
import { useState } from "react";

type PageProps = {
    plan: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    cta: string;
    popular?: boolean;
    onClick?: () => void;
}

export const PricingCard = ({ plan, price, period, desc, features, cta, popular, onClick }: PageProps) => {
    const [h, setH] = useState(false);
    return (
        <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: G.card, border: `1px solid ${popular ? G.accent : G.border}`, borderRadius: 16, padding: 32, position: "relative", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? "0 20px 60px rgba(0,0,0,0.3)" : "none", transition: "all .2s" }}>
            {popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: G.accent, color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 14px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>Most popular</div>}
            <div style={{ color: G.muted, fontFamily: G.fontHead, fontWeight: 700, fontSize: "0.9rem", marginBottom: 8 }}>{plan}</div>
            <div style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "2.4rem", lineHeight: 1, marginBottom: 4 }}>{price} <span style={{ fontSize: "1rem", fontWeight: 400, color: G.muted }}>{period}</span></div>
            <div style={{ color: G.muted, fontSize: "0.85rem", marginBottom: 24 }}>{desc}</div>
            <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {features.map(f => <li key={f} style={{ padding: "8px 0", borderBottom: `1px solid ${G.border}`, fontSize: "0.88rem", color: G.muted, display: "flex", alignItems: "center", gap: 10 }}><span style={{ color: G.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>{f}</li>)}
            </ul>
            <Btn variant={popular ? "primary" : "outline"} onClick={onClick} style={{ width: "100%", padding: 12, fontSize: "0.9rem", borderRadius: 8 }}>{cta}</Btn>
        </div>
    );
};