import { Logo } from "@/components/icons/Logo";
import { Btn } from "@/components/utils/Btn";
import { useEffect, useState } from "react";
import { G } from "../../app/page";

type PageProps = {
    page: string;
    setPage: (p: string) => void;
}

export const Nav = ({
    page,
    setPage
}: PageProps) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);
    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: 64, background: scrolled ? "rgba(11,13,17,0.92)" : "rgba(11,13,17,0.7)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${G.border}`, transition: "background .3s" }}>
            <Logo onClick={() => setPage("home")} />
            {page === "home" && (
                <ul style={{ display: "flex", alignItems: "center", gap: 32, listStyle: "none" }}>
                    {["Features", "Pricing", "Docs", "Changelog"].map(l => (
                        <li key={l}><a href="#" style={{ color: G.muted, textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>{l}</a></li>
                    ))}
                </ul>
            )}
            <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="ghost" onClick={() => setPage("login")} style={{ padding: "8px 16px", fontSize: "0.875rem" }}>Sign in</Btn>
                <Btn onClick={() => setPage("register-company")} style={{ padding: "9px 20px", fontSize: "0.875rem" }}>Get started free</Btn>
            </div>
        </nav>
    );
};