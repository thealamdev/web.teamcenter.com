import { G } from "@/app/page";

type PageProps = {
    label: string;
}

export const Divider = ({ label }: PageProps) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
        <div style={{ flex: 1, height: 1, background: G.border }} />
        <span style={{ color: G.muted, fontSize: "0.78rem", whiteSpace: "nowrap" }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: G.border }} />
    </div>
);