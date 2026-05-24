"use client";

import { G } from "@/app/page";
import { useEffect } from "react";
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";

const injectGlobalCSS = () => {
    if (document.getElementById("fd-global")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = FONT_LINK;
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "fd-global";
    style.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${G.bg}; color: ${G.text}; font-family: ${G.fontBody}; }
    ::placeholder { color: ${G.muted} !important; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
    @keyframes pulse { 0%,100% { opacity:.6 } 50% { opacity:1 } }
    .fd-fade-up { animation: fadeUp .6s ease both; }
    .fd-fade-up-1 { animation: fadeUp .6s .1s ease both; }
    .fd-fade-up-2 { animation: fadeUp .6s .2s ease both; }
    .fd-fade-up-3 { animation: fadeUp .6s .3s ease both; }
    .fd-fade-up-4 { animation: fadeUp .6s .4s ease both; }
    .fd-fade-in { animation: fadeIn .5s ease both; }
    input, select, textarea {
      width:100%; background:${G.bg3}; border:1px solid ${G.border};
      border-radius:9px; padding:12px 14px; color:${G.text};
      font-family:${G.fontBody}; font-size:0.9rem; outline:none;
      transition: border-color .2s, box-shadow .2s;
    }
    input:focus, select:focus, textarea:focus {
      border-color:${G.borderFocus}; box-shadow:0 0 0 3px rgba(79,126,248,0.1);
    }
    select option { background:${G.bg3}; }
    textarea { resize:vertical; min-height:80px; }
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:${G.bg}; }
    ::-webkit-scrollbar-thumb { background:${G.bg3}; border-radius:3px; }
  `;
    document.head.appendChild(style);
};

export default function LayoutContext({ children }: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => { injectGlobalCSS(); }, []);
    return (
        <div>{children}</div>
    )
}
