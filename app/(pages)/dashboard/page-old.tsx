"use client";

import { G } from "@/app/page";
import { useState } from "react";

const injectFonts = () => {
    if (document.getElementById("fd-fonts")) return;
    const l = document.createElement("link");
    l.id = "fd-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(l);
    const s = document.createElement("style");
    s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${G.bg}; color: ${G.text}; font-family: ${G.fontBody}; overflow: hidden; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${G.bg3}; border-radius: 4px; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
    @keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:.4} }
    .fd-fade { animation: fadeIn .4s ease both; }
    .fd-fade-1 { animation: fadeIn .4s .05s ease both; }
    .fd-fade-2 { animation: fadeIn .4s .1s ease both; }
    .fd-fade-3 { animation: fadeIn .4s .15s ease both; }
    .fd-fade-4 { animation: fadeIn .4s .2s ease both; }
    .fd-fade-5 { animation: fadeIn .4s .25s ease both; }
  `;
    document.head.appendChild(s);
};

// ─── ICONS (inline SVG) ──────────────────────────────────────────
const Icon = ({ d, size = 16, color = "currentColor", fill = "none", strokeW = 1.7 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
        {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
);

const ICONS = {
    home: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
    board: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M3 14h7v7H3z", "M14 14h7v7h-7z"],
    inbox: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
    users: ["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M9 11a4 4 0 100-8 4 4 0 000 8z", "M23 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75"],
    chart: ["M18 20V10", "M12 20V4", "M6 20v-6"],
    bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    search: ["M11 19a8 8 0 100-16 8 8 0 000 16z", "M21 21l-4.35-4.35"],
    plus: "M12 5v14M5 12h14",
    chevron: "M9 18l6-6-6-6",
    menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
    grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
    layers: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
    clock: ["M12 22a10 10 0 100-20 10 10 0 000 20z", "M12 6v6l4 2"],
    tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
    logout: ["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"],
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3",
    more: ["M12 5a1 1 0 100-2 1 1 0 000 2z", "M12 13a1 1 0 100-2 1 1 0 000 2z", "M12 21a1 1 0 100-2 1 1 0 000 2z"],
    check: "M20 6L9 17l-5-5",
    arrow: "M5 12h14M12 5l7 7-7 7",
    sparkle: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",
};

// ─── NAV ITEMS ────────────────────────────────────────────────────
const NAV = [
    { id: "dashboard", label: "Dashboard", icon: "home", badge: null },
    { id: "board", label: "Board", icon: "board", badge: null },
    { id: "inbox", label: "Inbox", icon: "inbox", badge: 4 },
    { id: "analytics", label: "Analytics", icon: "chart", badge: null },
    { id: "members", label: "Members", icon: "users", badge: null },
    { id: "settings", label: "Settings", icon: "settings", badge: null },
];

const PROJECTS = [
    { name: "Frontend Revamp", color: "#4f7ef8", progress: 72 },
    { name: "API v3 Migration", color: "#a78bfa", progress: 44 },
    { name: "Mobile App", color: "#34d399", progress: 88 },
    { name: "Design System", color: "#fbbf24", progress: 31 },
];

// ─── SIDEBAR ─────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, collapsed, setCollapsed }) => {
    const w = collapsed ? 64 : 240;
    return (
        <aside style={{ width: w, minWidth: w, height: "100vh", background: G.bg2, borderRight: `1px solid ${G.border}`, display: "flex", flexDirection: "column", transition: "width .25s cubic-bezier(.4,0,.2,1)", overflow: "hidden", flexShrink: 0, position: "relative", zIndex: 10 }}>
            {/* Logo */}
            <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 16px", borderBottom: `1px solid ${G.border}`, flexShrink: 0, gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", flexShrink: 0, fontFamily: G.fontHead }}>F</div>
                {!collapsed && <span style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "1.1rem", color: G.text, whiteSpace: "nowrap", overflow: "hidden" }}>FlowDesk</span>}
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto", overflowX: "hidden" }}>
                <div style={{ marginBottom: 24 }}>
                    {NAV.map(n => <NavItem key={n.id} item={n} active={active === n.id} collapsed={collapsed} onClick={() => setActive(n.id)} />)}
                </div>

                {!collapsed && (
                    <div style={{ marginTop: 8 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: G.muted, padding: "0 8px", marginBottom: 10 }}>Projects</div>
                        {PROJECTS.map(p => (
                            <div key={p.name} style={{ padding: "8px 10px", borderRadius: 8, marginBottom: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                                <span style={{ fontSize: "0.82rem", color: G.muted, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                                <span style={{ fontSize: "0.72rem", color: p.color, fontWeight: 600 }}>{p.progress}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </nav>

            {/* Bottom user */}
            <div style={{ borderTop: `1px solid ${G.border}`, padding: "12px 8px", flexShrink: 0 }}>
                <NavItem item={{ id: "logout", label: "Log out", icon: "logout" }} active={false} collapsed={collapsed} onClick={() => { }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", marginTop: 4 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, #4f7ef8, #a78bfa)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>JD</div>
                    {!collapsed && (
                        <div style={{ overflow: "hidden" }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: G.text, whiteSpace: "nowrap" }}>Jane Doe</div>
                            <div style={{ fontSize: "0.72rem", color: G.muted, whiteSpace: "nowrap" }}>Admin</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Collapse toggle */}
            <button onClick={() => setCollapsed(c => !c)} style={{ position: "absolute", top: 68, right: -12, width: 24, height: 24, borderRadius: "50%", background: G.bg3, border: `1px solid ${G.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: G.muted, zIndex: 20, transition: "transform .25s" }}>
                <div style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform .25s", display: "flex" }}>
                    <Icon d={ICONS.chevron} size={12} color={G.muted} />
                </div>
            </button>
        </aside>
    );
};

const NavItem = ({ item, active, collapsed, onClick }) => {
    const [hov, setHov] = useState(false);
    return (
        <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: active ? "rgba(79,126,248,0.12)" : hov ? "rgba(255,255,255,0.04)" : "transparent", color: active ? G.accent : hov ? G.text : G.muted, transition: "all .15s", position: "relative", marginBottom: 2, fontFamily: G.fontBody, textAlign: "left" }}>
            <div style={{ flexShrink: 0, display: "flex" }}>
                <Icon d={ICONS[item.icon]} size={16} color="currentColor" />
            </div>
            {!collapsed && <span style={{ fontSize: "0.875rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", flex: 1 }}>{item.label}</span>}
            {!collapsed && item.badge && <span style={{ background: `rgba(79,126,248,0.2)`, color: G.accent, fontSize: "0.7rem", fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{item.badge}</span>}
            {active && <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, borderRadius: "0 2px 2px 0", background: G.accent }} />}
        </button>
    );
};

// ─── TOP HEADER ───────────────────────────────────────────────────
const TopHeader = ({ activeTab }) => {
    const [search, setSearch] = useState("");
    const titles = { dashboard: "Dashboard", board: "Sprint Board", inbox: "Inbox", analytics: "Analytics", members: "Team Members", settings: "Settings" };
    return (
        <header style={{ height: 64, background: G.bg2, borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0 }}>
            {/* Title */}
            <div style={{ flex: 1 }}>
                <h1 style={{ fontFamily: G.fontHead, fontWeight: 700, fontSize: "1.05rem", color: G.text }}>{titles[activeTab] || "Dashboard"}</h1>
                <p style={{ fontSize: "0.75rem", color: G.muted, marginTop: 1 }}>Acme Corp · acme.flowdesk.io</p>
            </div>

            {/* Search */}
            <div style={{ position: "relative", width: 240 }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: G.muted, pointerEvents: "none" }}>
                    <Icon d={ICONS.search} size={14} color={G.muted} />
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search issues…"
                    style={{ width: "100%", background: G.bg3, border: `1px solid ${G.border}`, borderRadius: 8, padding: "8px 12px 8px 32px", color: G.text, fontFamily: G.fontBody, fontSize: "0.82rem", outline: "none" }} />
                <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: G.bg2, border: `1px solid ${G.border}`, borderRadius: 4, padding: "1px 6px", fontSize: "0.65rem", color: G.muted }}>⌘K</div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <HeaderBtn icon="filter" label="Filter" />
                <HeaderBtn icon="plus" label="New Issue" primary />
                <NotifBtn />
                <Avatar initials="JD" />
            </div>
        </header>
    );
};

const HeaderBtn = ({ icon, label, primary }) => {
    const [h, setH] = useState(false);
    return (
        <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: `1px solid ${primary ? "transparent" : G.border}`, background: primary ? (h ? "#3a6aed" : G.accent) : (h ? G.bg3 : "transparent"), color: primary ? "#fff" : (h ? G.text : G.muted), cursor: "pointer", fontFamily: G.fontBody, fontSize: "0.82rem", fontWeight: 500, transition: "all .15s", boxShadow: primary && h ? "0 4px 16px rgba(79,126,248,0.3)" : "none" }}>
            <Icon d={ICONS[icon]} size={13} color="currentColor" />
            {label}
        </button>
    );
};

const NotifBtn = () => {
    const [h, setH] = useState(false);
    return (
        <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{ position: "relative", width: 34, height: 34, borderRadius: 8, background: h ? G.bg3 : "transparent", border: `1px solid ${h ? G.border : "transparent"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: G.muted, transition: "all .15s" }}>
            <Icon d={ICONS.bell} size={16} color="currentColor" />
            <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: G.error, border: `2px solid ${G.bg2}` }} />
        </button>
    );
};

const Avatar = ({ initials }) => (
    <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${G.accent}, ${G.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0 }}>{initials}</div>
);

// ─── DASHBOARD CONTENT ────────────────────────────────────────────
const DashboardContent = () => (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {[
                { label: "Open Issues", val: "142", delta: "+12 this week", color: G.accent, icon: "flag" },
                { label: "In Progress", val: "38", delta: "6 added today", color: G.accent2, icon: "clock" },
                { label: "Completed", val: "891", delta: "+24 this week", color: G.success, icon: "check" },
                { label: "Cycle Time", val: "3.2d", delta: "↓ 0.4 vs last", color: G.warning, icon: "sparkle" },
            ].map((s, i) => <StatCard key={s.label} {...s} delay={i} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 340px", gap: 16, marginBottom: 16 }}>
            {/* Kanban mini */}
            <KanbanPanel />
            {/* Burndown */}
            <BurndownPanel />
            {/* Activity */}
            <ActivityPanel />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <IssuesTable />
            <TeamPanel />
        </div>
    </div>
);

const StatCard = ({ label, val, delta, color, icon, delay }) => {
    const [h, setH] = useState(false);
    return (
        <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            className={`fd-fade-${delay + 1}`}
            style={{ background: G.card, border: `1px solid ${h ? color + "44" : G.border}`, borderRadius: 14, padding: "20px 22px", transition: "all .2s", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? `0 8px 32px ${color}18` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon d={ICONS[icon]} size={16} color={color} />
                </div>
                <span style={{ fontSize: "0.72rem", color: G.muted, background: G.bg3, padding: "3px 9px", borderRadius: 6, border: `1px solid ${G.border}` }}>{delta}</span>
            </div>
            <div style={{ fontFamily: G.fontHead, fontWeight: 800, fontSize: "2rem", color: G.text, lineHeight: 1, marginBottom: 5 }}>{val}</div>
            <div style={{ fontSize: "0.82rem", color: G.muted }}>{label}</div>
        </div>
    );
};

const Panel = ({ title, action, children, delay = "", style: s = {} }) => (
    <div className={`fd-fade${delay}`} style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", ...s }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontFamily: G.fontHead, fontWeight: 700, fontSize: "0.9rem", color: G.text }}>{title}</span>
            {action && <button style={{ background: "none", border: "none", color: G.muted, fontSize: "0.78rem", cursor: "pointer", fontFamily: G.fontBody }}>{action}</button>}
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
);

const TASKS = [
    { col: "Todo", tasks: [{ t: "OAuth login flow", l: "Feature", c: "#4f7ef8" }, { t: "Mobile sidebar fix", l: "Bug", c: "#f87171" }, { t: "Add CSV export", l: "Feature", c: "#4f7ef8" }] },
    { col: "Progress", tasks: [{ t: "Dashboard redesign", l: "Improve", c: "#a78bfa" }, { t: "Domain routing", l: "Feature", c: "#4f7ef8" }] },
    { col: "Done", tasks: [{ t: "Company wizard", l: "Feature", c: "#4f7ef8" }, { t: "Token refresh bug", l: "Bug", c: "#f87171" }] },
];

const KanbanPanel = () => (
    <Panel title="Sprint Board" action="View all →">
        <div style={{ display: "flex", gap: 10, padding: 14, height: "100%", overflowX: "auto" }}>
            {TASKS.map(({ col, tasks }) => (
                <div key={col} style={{ flex: 1, minWidth: 120, background: G.bg3, borderRadius: 9, padding: 10, overflowY: "auto" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: G.muted, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                        {col} <span style={{ background: G.bg2, borderRadius: 4, padding: "0 6px" }}>{tasks.length}</span>
                    </div>
                    {tasks.map(({ t, l, c }) => (
                        <div key={t} style={{ background: G.card, border: `1px solid ${G.border}`, borderRadius: 7, padding: "9px 10px", marginBottom: 7 }}>
                            <span style={{ background: `${c}22`, color: c, fontSize: "0.63rem", fontWeight: 700, padding: "2px 7px", borderRadius: 4, display: "inline-block", marginBottom: 5 }}>{l}</span>
                            <div style={{ fontSize: "0.78rem", color: G.text, lineHeight: 1.4 }}>{t}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </Panel>
);

// Burndown as an SVG chart
const BurndownPanel = () => {
    const ideal = [100, 87, 74, 61, 48, 35, 22, 9, 0];
    const actual = [100, 92, 80, 70, 55, 47, 38, null, null];
    const W = 420, H = 160, PL = 8, PT = 10, PB = 24, PR = 8;
    const cw = W - PL - PR, ch = H - PT - PB;
    const px = (i) => PL + i * (cw / 8);
    const py = (v) => PT + ch - (v / 100 * ch);
    const toPath = arr => arr.reduce((acc, v, i) => v !== null ? acc + (acc ? "L" : "M") + `${px(i)},${py(v)}` : acc, "");
    const days = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"];
    return (
        <Panel title="Burndown Chart" action="Sprint 12">
            <div style={{ padding: "12px 16px 8px" }}>
                <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
                    {[0, 25, 50, 75, 100].map(v => (
                        <g key={v}>
                            <line x1={PL} y1={py(v)} x2={W - PR} y2={py(v)} stroke={G.border} strokeWidth="1" />
                            <text x={PL - 2} y={py(v) + 4} fontSize="9" fill={G.muted} textAnchor="end">{v}</text>
                        </g>
                    ))}
                    {days.map((d, i) => <text key={d} x={px(i)} y={H - 4} fontSize="9" fill={G.muted} textAnchor="middle">{d}</text>)}
                    <path d={toPath(ideal)} fill="none" stroke={G.border} strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d={toPath(actual.filter(v => v !== null))} fill="none" stroke={G.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={G.accent} stopOpacity=".18" /><stop offset="100%" stopColor={G.accent} stopOpacity="0" /></linearGradient></defs>
                    <path d={toPath(actual.filter(v => v !== null)) + `L${px(actual.filter(v => v !== null).length - 1)},${py(0)}L${px(0)},${py(0)}Z`} fill="url(#bg1)" />
                    {actual.map((v, i) => v !== null && <circle key={i} cx={px(i)} cy={py(v)} r="3.5" fill={G.accent} stroke={G.bg2} strokeWidth="2" />)}
                </svg>
                <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: G.muted }}><div style={{ width: 16, height: 2, background: G.accent, borderRadius: 1 }} /> Actual</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: G.muted }}><div style={{ width: 16, height: 1, background: G.muted, borderRadius: 1, opacity: .5 }} /> Ideal</div>
                </div>
            </div>
        </Panel>
    );
};

const ACTIVITY = [
    { user: "JD", name: "Jane", action: "closed", issue: "FD-182", time: "2m ago", color: "#34d399" },
    { user: "MK", name: "Mike", action: "opened", issue: "FD-183", time: "14m ago", color: "#4f7ef8" },
    { user: "SR", name: "Sara", action: "commented", issue: "FD-179", time: "28m ago", color: "#a78bfa" },
    { user: "JD", name: "Jane", action: "assigned", issue: "FD-180", time: "1h ago", color: "#4f7ef8" },
    { user: "TK", name: "Tom", action: "merged", issue: "FD-177", time: "2h ago", color: "#34d399" },
    { user: "MK", name: "Mike", action: "reopened", issue: "FD-175", time: "3h ago", color: "#fbbf24" },
];

const ActivityPanel = () => (
    <Panel title="Activity" style={{ gridColumn: "span 1" }}>
        <div style={{ padding: "8px 12px", overflowY: "auto", maxHeight: 300 }}>
            {ACTIVITY.map(({ user, name, action, issue, time, color }) => (
                <div key={issue + time} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${G.border}` }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}22`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color, flexShrink: 0 }}>{user}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.78rem", color: G.text, lineHeight: 1.4 }}>
                            <strong style={{ color: G.text }}>{name}</strong>{" "}
                            <span style={{ color: G.muted }}>{action}</span>{" "}
                            <span style={{ color: G.accent, fontFamily: G.fontHead, fontWeight: 600 }}>{issue}</span>
                        </p>
                        <span style={{ fontSize: "0.68rem", color: G.muted }}>{time}</span>
                    </div>
                </div>
            ))}
        </div>
    </Panel>
);

const ISSUES = [
    { id: "FD-183", title: "Implement OAuth login", priority: "High", status: "Todo", assign: "MK" },
    { id: "FD-182", title: "Fix mobile sidebar", priority: "Medium", status: "Done", assign: "JD" },
    { id: "FD-181", title: "Dashboard analytics", priority: "High", status: "Progress", assign: "SR" },
    { id: "FD-180", title: "CSV export feature", priority: "Low", status: "Todo", assign: "JD" },
    { id: "FD-179", title: "Token refresh race", priority: "High", status: "Done", assign: "TK" },
    { id: "FD-178", title: "Multi-domain routing", priority: "Medium", status: "Progress", assign: "MK" },
];

const PRIORITY_COLOR = { High: "#f87171", Medium: "#fbbf24", Low: "#34d399" };
const STATUS_COLOR = { Todo: G.muted, Progress: G.accent, Done: G.success };

const IssuesTable = () => (
    <Panel title="Recent Issues" action="View all">
        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                    <tr style={{ background: G.bg3 }}>
                        {["ID", "Title", "Priority", "Status", ""].map(h => (
                            <th key={h} style={{ padding: "9px 14px", textAlign: "left", color: G.muted, fontWeight: 600, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${G.border}`, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ISSUES.map(({ id, title, priority, status, assign }) => (
                        <tr key={id} style={{ borderBottom: `1px solid ${G.border}`, transition: "background .15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = G.bg3}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                            <td style={{ padding: "10px 14px", color: G.accent, fontFamily: G.fontHead, fontWeight: 600, fontSize: "0.78rem", whiteSpace: "nowrap" }}>{id}</td>
                            <td style={{ padding: "10px 14px", color: G.text, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</td>
                            <td style={{ padding: "10px 14px" }}>
                                <span style={{ background: `${PRIORITY_COLOR[priority]}18`, color: PRIORITY_COLOR[priority], padding: "3px 9px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap" }}>{priority}</span>
                            </td>
                            <td style={{ padding: "10px 14px" }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: STATUS_COLOR[status], fontSize: "0.78rem" }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLOR[status], animation: status === "Progress" ? "pulse2 1.5s infinite" : "none" }} />
                                    {status}
                                </span>
                            </td>
                            <td style={{ padding: "10px 14px" }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, background: `${G.accent}22`, border: `1px solid ${G.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: G.accent }}>{assign}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Panel>
);

const TEAM = [
    { name: "Jane Doe", role: "Product Lead", init: "JD", tasks: 12, color: "#4f7ef8" },
    { name: "Mike Kim", role: "Frontend Dev", init: "MK", tasks: 8, color: "#a78bfa" },
    { name: "Sara Raza", role: "UI Designer", init: "SR", tasks: 6, color: "#34d399" },
    { name: "Tom Kwan", role: "Backend Dev", init: "TK", tasks: 10, color: "#fbbf24" },
];

const TeamPanel = () => (
    <Panel title="Team" action="Manage">
        <div style={{ padding: "8px 16px" }}>
            {TEAM.map(({ name, role, init, tasks, color }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${G.border}` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}22`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color, flexShrink: 0 }}>{init}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: G.text }}>{name}</div>
                        <div style={{ fontSize: "0.75rem", color: G.muted }}>{role}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: G.text }}>{tasks}</div>
                        <div style={{ fontSize: "0.7rem", color: G.muted }}>issues</div>
                    </div>
                    <div style={{ width: 60 }}>
                        <div style={{ height: 4, background: G.bg3, borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${(tasks / 12) * 100}%`, background: `linear-gradient(90deg,${color},${color}aa)`, borderRadius: 2 }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Panel>
);

// ─── PLACEHOLDER CONTENT ─────────────────────────────────────────
const PlaceholderContent = ({ label }) => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, color: G.muted }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: G.bg3, border: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={ICONS.grid} size={28} color={G.muted} />
        </div>
        <div style={{ fontFamily: G.fontHead, fontSize: "1.1rem", fontWeight: 700, color: G.text }}>{label}</div>
        <div style={{ fontSize: "0.88rem", color: G.muted }}>This section is coming soon</div>
    </div>
);

// ─── APP ─────────────────────────────────────────────────────────
export default function App() {
    injectFonts();
    const [active, setActive] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: G.bg, fontFamily: G.fontBody }}>
            <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
                <TopHeader activeTab={active} />
                <main style={{ flex: 1, overflow: "auto", background: G.bg }}>
                    {active === "dashboard" && <DashboardContent />}
                    {active !== "dashboard" && <PlaceholderContent label={active.charAt(0).toUpperCase() + active.slice(1)} />}
                </main>
            </div>
        </div>
    );
}