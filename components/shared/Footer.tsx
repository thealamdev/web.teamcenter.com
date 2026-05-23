import { G } from "@/app/page";
import { Logo } from "../icons/Logo";

type FooterSection = {
    heading: string;
    links: string[];
};

const footerData: FooterSection[] = [
    {
        heading: "Product",
        links: ["Features", "Changelog", "Roadmap", "Status"],
    },
    {
        heading: "Company",
        links: ["About", "Blog", "Careers", "Press"],
    },
    {
        heading: "Legal",
        links: ["Privacy Policy", "Terms", "Cookies", "Security"],
    },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: G.bg2,
                borderTop: `1px solid ${G.border}`,
                padding: "64px 5% 32px",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr repeat(3,1fr)",
                    gap: 48,
                    marginBottom: 48,
                }}
            >
                {/* Logo + Description */}
                <div>
                    <Logo onClick={() => { }} />

                    <p
                        style={{
                            color: G.muted,
                            fontSize: "0.875rem",
                            marginTop: 12,
                            maxWidth: 220,
                            lineHeight: 1.7,
                        }}
                    >
                        Project management for modern teams. Built for scale, designed for humans.
                    </p>
                </div>

                {/* Sections */}
                {footerData.map((section) => (
                    <div key={section.heading}>
                        <h4
                            style={{
                                fontFamily: G.fontHead,
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                marginBottom: 16,
                                color: G.text,
                            }}
                        >
                            {section.heading}
                        </h4>

                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {section.links.map((link) => (
                                <li key={link} style={{ marginBottom: 10 }}>
                                    <a
                                        href="#"
                                        style={{
                                            color: G.muted,
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    borderTop: `1px solid ${G.border}`,
                    paddingTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                }}
            >
                <p style={{ color: G.muted, fontSize: "0.8rem" }}>
                    © 2025 TeamCenter, Inc. All rights reserved.
                </p>

                <div style={{ display: "flex", gap: 10 }}>
                    {["𝕏", "in", "gh"].map((s: string) => (
                        <a
                            key={s}
                            href="#"
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 8,
                                background: G.bg3,
                                border: `1px solid ${G.border}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: G.muted,
                                fontSize: "0.8rem",
                                textDecoration: "none",
                            }}
                        >
                            {s}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}