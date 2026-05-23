import { useState, MouseEventHandler, ReactNode, CSSProperties } from "react";
import { G } from "@/app/page";

type Variant = "primary" | "outline" | "ghost";

interface BtnProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: Variant;
    style?: CSSProperties;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Btn = ({
    children,
    onClick,
    variant = "primary",
    style: s = {},
    type = "button",
    disabled = false,
}: BtnProps) => {
    const [hov, setHov] = useState(false);

    const base: CSSProperties = {
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: G.fontBody,
        fontWeight: 600,
        borderRadius: 10,
        transition: "all .2s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        opacity: disabled ? 0.6 : 1,
    };

    const variants: Record<Variant, CSSProperties> = {
        primary: {
            background: hov ? "#3a6aed" : G.accent,
            color: "#fff",
            boxShadow: hov ? "0 4px 20px rgba(79,126,248,0.35)" : "none",
            transform: hov ? "translateY(-1px)" : "none",
        },
        outline: {
            background: "transparent",
            color: hov ? G.accent : G.text,
            border: `1px solid ${hov ? G.accent : G.border}`,
        },
        ghost: {
            background: hov ? G.bg3 : "transparent",
            color: hov ? G.text : G.muted,
            border: "none",
        },
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{ ...base, ...variants[variant], ...s }}
        >
            {children}
        </button>
    );
};