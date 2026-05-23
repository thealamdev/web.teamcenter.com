import { G } from "@/app/page";
import { useState } from "react";

type PageProps = {
    icon: React.ReactNode;
    label: string;
}
export const SocialBtn = ({ icon, label }: PageProps) => {
    const [h, setH] = useState(false);
    return (
        <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? G.card : G.bg3, border: `1px solid ${h ? "rgba(255,255,255,0.14)" : G.border}`, color: G.text, padding: "11px 16px", borderRadius: 9, cursor: "pointer", fontFamily: G.fontBody, fontSize: "0.85rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .2s" }}>
            {icon} {label}
        </button>
    );
};