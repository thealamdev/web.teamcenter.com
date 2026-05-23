import {
    ChangeEventHandler,
    InputHTMLAttributes,
    ReactNode,
} from "react";
import { G } from "@/app/page";

// remove conflicting native props only (NO design change)
type NativeInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
>;

interface InputProps extends NativeInputProps {
    label?: string;
    required?: boolean;
    hint?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    error?: boolean;
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
    label,
    required,
    hint,
    prefix,
    suffix,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
    ...rest
}: InputProps) => (
    <div style={{ marginBottom: 18 }}>
        {label && (
            <label
                style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: G.text,
                    marginBottom: 8,
                }}
            >
                {label}
                {required && <span style={{ color: G.accent }}> *</span>}
            </label>
        )}

        <div style={{ position: "relative", display: "flex" }}>
            {prefix && (
                <span
                    style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: G.muted,
                        fontSize: "0.9rem",
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                >
                    {prefix}
                </span>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
                style={{
                    paddingLeft: prefix ? 32 : 14,
                    borderTopRightRadius: suffix ? 0 : 9,
                    borderBottomRightRadius: suffix ? 0 : 9,
                    borderColor: error
                        ? "rgba(248,113,113,0.5)"
                        : G.border,
                }}
            />

            {suffix && (
                <div
                    style={{
                        background: G.bg2,
                        border: `1px solid ${G.border}`,
                        borderLeft: "none",
                        borderRadius: "0 9px 9px 0",
                        padding: "0 14px",
                        color: G.muted,
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {suffix}
                </div>
            )}
        </div>

        {hint && (
            <p
                style={{
                    fontSize: "0.78rem",
                    color: error ? G.error : G.muted,
                    marginTop: 5,
                }}
            >
                {hint}
            </p>
        )}
    </div>
);