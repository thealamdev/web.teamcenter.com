import { G } from "@/app/page";

export const Logo = ({ onClick }: any) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.2rem", color: G.text, textDecoration: "none", padding: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>F</div>
        TeamCenter
    </button>
);