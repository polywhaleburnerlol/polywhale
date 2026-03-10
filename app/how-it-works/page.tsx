"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Zap,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
  Key,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  BrainCircuit,
  ShieldCheck,
  Fingerprint,
  Check,
  X as XIcon,
  Cpu,
  User,
  Users,
  TrendingUp,
  Activity,
  Server,
  Lock,
} from "lucide-react";

/* ─────────────────────────────────────────
   PALETTE  — copied EXACTLY from app/page.tsx (source of truth)
───────────────────────────────────────── */
const COLORS = {
  bg: "#060b18",
  bgCard: "rgba(12,20,40,0.65)",
  accent: "#00e5cc",
  accentAlt: "#7c5cfc",
  accentPink: "#f472b6",
  textPrimary: "#e2e8f0",
  textSecondary: "#8492a6",
  border: "rgba(0,229,204,0.12)",
};

/* Local alias — keeps every downstream component compiling without changes */
const C = {
  bg:           COLORS.bg,
  bgCard:       COLORS.bgCard,
  bgDeep:       "#0b1221",
  accent:       COLORS.accent,
  accentAlt:    COLORS.accentAlt,
  accentPink:   COLORS.accentPink,
  text:         COLORS.textPrimary,
  textMuted:    "#94a3b8",
  textDim:      "#4a5568",
  border:       "rgba(255,255,255,0.04)",
  borderAccent: COLORS.border,
};

/* ─────────────────────────────────────────
   GLOBAL STYLES — copied EXACTLY from app/page.tsx (source of truth)
   Extra keyframes required by how-it-works sections appended at the end.
───────────────────────────────────────── */
function GlobalStyles(): React.JSX.Element {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

      :root {
        --accent: ${COLORS.accent};
        --accent-alt: ${COLORS.accentAlt};
        --bg: ${COLORS.bg};
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body, html, #root {
        background: var(--bg);
        color: ${COLORS.textPrimary};
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      .font-display { font-family: 'Syne', sans-serif; }
      .font-syne    { font-family: 'Syne', sans-serif; }
      .font-mono    { font-family: 'JetBrains Mono', 'Courier New', monospace; }

      .glow-accent { text-shadow: 0 0 40px rgba(0,229,204,0.35); }
      .glow-box { box-shadow: 0 0 60px -12px rgba(0,229,204,0.2), inset 0 1px 0 rgba(255,255,255,0.05); }
      .glow-box-hover:hover { box-shadow: 0 0 80px -8px rgba(0,229,204,0.3), inset 0 1px 0 rgba(255,255,255,0.08); }

      .glass {
        background: rgba(10,16,32,0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(0,229,204,0.08);
      }

      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .ticker-track { animation: scroll-left 45s linear infinite; }
      .ticker-track:hover { animation-play-state: paused; }

      .reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal.visible { opacity: 1; transform: translateY(0); }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .btn-shimmer {
        background: linear-gradient(110deg, #00e5cc 0%, #00e5cc 40%, #7dfff0 50%, #00e5cc 60%, #00e5cc 100%);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }

      @keyframes grid-drift {
        0% { transform: translate(0,0); }
        100% { transform: translate(40px,40px); }
      }
      .grid-bg {
        background-image:
          linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: grid-drift 20s linear infinite;
      }

      @keyframes dash-pulse {
        0%,100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      @keyframes icon-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes icon-glow-cyan {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(0,229,204,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(0,229,204,0.7)); }
      }
      @keyframes icon-glow-purple {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(124,92,252,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(124,92,252,0.7)); }
      }
      @keyframes icon-glow-pink {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(244,114,182,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(244,114,182,0.7)); }
      }
      @keyframes icon-glow-amber {
        0%, 100% { filter: drop-shadow(0 0 4px rgba(251,191,36,0.2)); }
        50% { filter: drop-shadow(0 0 14px rgba(251,191,36,0.7)); }
      }

      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }

      @media(max-width:768px){
        .hide-mobile { display:none!important }
        .show-mobile-only { display:block!important }
      }
      @media(min-width:769px){
        .show-mobile-only { display:none!important }
      }
      @media(max-width:900px){
        .hero-grid { grid-template-columns:1fr!important }
        .hide-on-wrap { display:none!important }
      }
      @media(max-width:768px){
        .footer-grid { grid-template-columns:1fr 1fr!important }
        .lat-layout  { flex-direction:column!important }
        .perm-grid   { grid-template-columns:1fr!important }
        .sec-cards   { grid-template-columns:1fr!important }
        .arch-row    { flex-direction:column!important; align-items:center!important }
      }

      /* ── keyframes used by how-it-works sections ── */
      @keyframes fade-up {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes bar-fill {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      @keyframes signal-ring {
        0%   { transform: scale(1);   opacity: 0.7; }
        100% { transform: scale(2.8); opacity: 0; }
      }
      @keyframes scroll-dot {
        0%,100% { opacity:0.3; transform:translateY(0); }
        50%     { opacity:1;   transform:translateY(7px); }
      }
      @keyframes glow-pulse {
        0%,100% { box-shadow: 0 0 12px rgba(0,229,204,0.14); }
        50%     { box-shadow: 0 0 28px rgba(0,229,204,0.38); }
      }
      @keyframes engine-glow {
        0%,100% {
          box-shadow: 0 0 0 1px rgba(0,229,204,0.12), 0 0 40px rgba(0,229,204,0.06), 0 24px 80px rgba(0,0,0,0.6);
        }
        50% {
          box-shadow: 0 0 0 1px rgba(0,229,204,0.22), 0 0 80px rgba(0,229,204,0.12), 0 24px 80px rgba(0,0,0,0.6);
        }
      }
      @keyframes terminal-in {
        from { opacity: 0; transform: translateX(-8px); }
        to   { opacity: 1; transform: translateX(0); }
      }

      .rv {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
      }
      .rv.vis { opacity:1; transform:translateY(0); }
    `}</style>
  );
}

/* ─────────────────────────────────────────
   SIGN-UP MODAL
───────────────────────────────────────── */
function SignUpModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (email: string) => void }): React.JSX.Element {
  const [email, setEmail]         = useState<string>("");
  const [password, setPassword]   = useState<string>("");
  const [showPass, setShowPass]   = useState<boolean>(false);
  const [focusedField, setFocused] = useState<string | null>(null);
  const [loading, setLoading]     = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);
  const [fieldErrs, setFieldErrs] = useState<{ email?: string; password?: string }>({});

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose(); };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const strength = (() => {
    let s = 0;
    if (password.length >= 8)          s++;
    if (password.length >= 12)         s++;
    if (/[A-Z]/.test(password))        s++;
    if (/[0-9]/.test(password))        s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Excellent"][strength] ?? "";
  const strengthColor = strength <= 1 ? "#ef4444" : strength === 2 ? "#f59e0b" : strength === 3 ? "#eab308" : "#00e5cc";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address.";
    if (!password || password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (Object.keys(errs).length) { setFieldErrs(errs); return; }
    setFieldErrs({}); setError(null); setLoading(true);
    try {
      const res  = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) setError(data.message ?? "Something went wrong. Please try again.");
      else         onSuccess(email);
    } catch { setError("Network error. Please try again."); }
    finally  { setLoading(false); }
  };

  const inputStyle = (field: string, hasErr: boolean): React.CSSProperties => ({
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasErr ? "rgba(239,68,68,0.6)" : focusedField === field ? "rgba(0,229,204,0.5)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focusedField === field && !hasErr ? "0 0 0 3px rgba(0,229,204,0.08)" : "none",
    borderRadius: 10, padding: "13px 16px", color: COLORS.textPrimary,
    fontFamily: "DM Sans, sans-serif", fontSize: 15, outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <div onClick={handleBackdrop} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(6,11,24,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", animation: "fade-in-up 0.2s ease both" }}>
      <div style={{ width: "100%", maxWidth: 440, background: "rgba(10,16,36,0.97)", border: "1px solid rgba(0,229,204,0.12)", borderRadius: 20, padding: "40px 36px", position: "relative", boxShadow: "0 0 0 1px rgba(0,229,204,0.06), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "-50%", right: "-50%", height: 1, background: "linear-gradient(90deg, transparent, #00e5cc, #7c5cfc, transparent)", opacity: 0.6 }} />
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: COLORS.textSecondary, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.borderColor = "rgba(0,229,204,0.35)"; t.style.color = COLORS.accent; }}
          onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.borderColor = "rgba(255,255,255,0.08)"; t.style.color = COLORS.textSecondary; }}>
          <XIcon size={14} />
        </button>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #00e5cc, #7c5cfc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Waves size={18} color="#060b18" strokeWidth={2.5} />
            </div>
            <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Poly<span style={{ color: COLORS.accent }}>Whale</span></span>
          </div>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Create your account</h2>
          <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.5 }}>Join thousands of traders mirroring smart money.</p>
        </div>
        {error && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <Shield size={14} color="#ef4444" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "#ef4444", lineHeight: 1.5 }}>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, color: focusedField === "email" ? COLORS.accent : COLORS.textSecondary, transition: "color 0.2s" }}>Email address</label>
            <input type="email" value={email} required autoComplete="email" onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="you@example.com" style={inputStyle("email", !!fieldErrs.email)} />
            {fieldErrs.email && <p style={{ marginTop: 5, fontSize: 12, color: "#ef4444" }}>{fieldErrs.email}</p>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, color: focusedField === "password" ? COLORS.accent : COLORS.textSecondary, transition: "color 0.2s" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} value={password} required autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="Min. 8 characters" style={{ ...inputStyle("password", !!fieldErrs.password), paddingRight: 44 }} />
              <button type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: COLORS.textSecondary, display: "flex", alignItems: "center" }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {password && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                  {[1,2,3,4,5].map((i) => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />))}
                </div>
                <span style={{ fontSize: 11, color: strengthColor, letterSpacing: "0.06em" }}>{strengthLabel}</span>
              </div>
            )}
            {fieldErrs.password && <p style={{ marginTop: 5, fontSize: 12, color: "#ef4444" }}>{fieldErrs.password}</p>}
          </div>
          <button type="submit" disabled={loading} className={loading ? "" : "btn-shimmer font-display"}
            style={{ marginTop: 4, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? "rgba(0,229,204,0.3)" : undefined, color: loading ? "rgba(255,255,255,0.5)" : "#060b18", fontWeight: 700, fontSize: 16, fontFamily: "Syne, sans-serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { if (!loading) { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(-1px)"; t.style.boxShadow = "0 8px 28px rgba(0,229,204,0.4)"; } }}
            onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}>
            {loading ? (<><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}><style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" /></svg>Creating account…</>) : (<><User size={16} /> Start trading free →</>)}
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(130,146,166,0.6)", lineHeight: 1.6 }}>
            Already have an account?{" "}<a href="/login" style={{ color: COLORS.accent, textDecoration: "none", fontWeight: 600 }}>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal(threshold = 0.1): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("vis"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────── */
function SectionLabel({ num, text, color }: { num: string; text: string; color: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
      <span className="font-mono" style={{
        fontSize:10, fontWeight:700, color,
        letterSpacing:"0.1em", padding:"4px 10px", borderRadius:6,
        background:`${color}0a`, border:`1px solid ${color}14`,
      }}>{num}</span>
      <span className="font-syne" style={{
        fontSize:10, fontWeight:700, color,
        textTransform:"uppercase", letterSpacing:"0.18em",
      }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   HEADER — copied EXACTLY word-for-word from app/page.tsx
   Single modification: "How It Works" link colour = COLORS.accent (active state)
   ═══════════════════════════════════════ */
function Header({
  onOpenModal,
  userEmail,
  onSignOut,
}: {
  onOpenModal: () => void;
  userEmail: string | null;
  onSignOut: () => void;
}): React.JSX.Element {
  const [scrolled, setScrolled]       = useState<boolean>(false);
  const [mobileOpen, setMobileOpen]   = useState<boolean>(false);
  const [socialsOpen, setSocialsOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const socialsRef                    = useRef<HTMLDivElement>(null);
  const accountRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (socialsRef.current && !socialsRef.current.contains(e.target as Node))
        setSocialsOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setAccountOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = ["The Bot", "Whales", "Pricing", "How It Works"];

  const getLinkHref = (label: string): string => {
    if (label === "The Bot")      return "/the-bot";
    if (label === "Whales")       return "/whales";
    if (label === "Pricing")      return "/pricing";
    if (label === "How It Works") return "/how-it-works";
    return "#";
  };

  const socialsLinks = [
    { label: "Discord",  href: "#", icon: "💬" },
    { label: "Telegram", href: "#", icon: "✈️" },
    { label: "X",        href: "#", icon: "𝕏" },
  ];

  /* Shared link style — identical to home page */
  const linkStyle: React.CSSProperties = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.01em",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  };

  return (
    <header
      className="glass font-display"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 0" : "16px 0",
        borderBottom: `1px solid ${scrolled ? "rgba(0,229,204,0.1)" : "rgba(0,229,204,0.06)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Waves size={20} color="#060b18" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
            Poly<span style={{ color: COLORS.accent }}>Whale</span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 28 }}>

          {/* Main links — "How It Works" is highlighted as the active page */}
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              style={{
                ...linkStyle,
                color: l === "How It Works" ? COLORS.accent : "#e2e8f0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = l === "How It Works" ? COLORS.accent : "#e2e8f0")}
            >
              {l}
            </a>
          ))}

          {/* Socials dropdown */}
          <div ref={socialsRef} style={{ position: "relative" }}>
            <button
              onClick={() => setSocialsOpen(!socialsOpen)}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Syne, sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: 0,
                color: socialsOpen ? COLORS.accent : "#e2e8f0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = COLORS.accent)}
              onMouseLeave={(e) => {
                if (!socialsOpen) (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
              }}
            >
              Socials
              <ChevronRight
                size={13}
                style={{
                  transform: socialsOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            {/* Glassmorphism dropdown panel */}
            {socialsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  minWidth: 160,
                  borderRadius: 12,
                  background: "rgba(10,16,36,0.96)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,229,204,0.12)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,204,0.04)",
                  padding: "6px",
                  animation: "fade-in-up 0.15s ease both",
                }}
              >
                {socialsLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setSocialsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: COLORS.textPrimary,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "DM Sans, sans-serif",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "rgba(0,229,204,0.07)";
                      t.style.color = COLORS.accent;
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget as HTMLAnchorElement;
                      t.style.background = "transparent";
                      t.style.color = COLORS.textPrimary;
                    }}
                  >
                    <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Create Account / My Account ── */}
          {userEmail ? (
            <div ref={accountRef} style={{ position: "relative" }}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 10,
                  border: "1px solid rgba(0,229,204,0.3)",
                  background: "rgba(0,229,204,0.08)",
                  color: COLORS.accent, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,204,0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,204,0.08)"; }}
              >
                <User size={14} />
                My Account
                <ChevronRight size={12} style={{ transform: accountOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>

              {accountOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: 0,
                  minWidth: 240, borderRadius: 14,
                  background: "rgba(10,16,36,0.98)",
                  backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,229,204,0.12)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,204,0.04)",
                  padding: "8px", animation: "fade-in-up 0.15s ease both", zIndex: 200,
                }}>
                  <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 6 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.textSecondary, marginBottom: 8 }}>Signed in as</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00e5cc, #7c5cfc)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <User size={15} color="#060b18" />
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail}</p>
                        <p style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 1 }}>Password: ••••••••</p>
                      </div>
                    </div>
                  </div>
                  {[
                    { label: "Dashboard", href: "https://polywhale-dashboard-1qhh.vercel.app/", icon: <Activity size={13} /> },
                    { label: "Pricing",   href: "/pricing",   icon: <TrendingUp size={13} /> },
                  ].map(({ label, href, icon }) => (
                    <a key={label} href={href} onClick={() => setAccountOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 8, textDecoration: "none", color: COLORS.textPrimary, fontSize: 13, fontWeight: 600, transition: "background 0.15s, color 0.15s" }}
                      onMouseEnter={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "rgba(0,229,204,0.07)"; t.style.color = COLORS.accent; }}
                      onMouseLeave={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "transparent"; t.style.color = COLORS.textPrimary; }}
                    >
                      {icon} {label}
                    </a>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 6, paddingTop: 6 }}>
                    <button
                      onClick={() => { onSignOut(); setAccountOpen(false); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 600, transition: "background 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <Key size={13} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenModal}
              className="btn-shimmer font-display"
              style={{
                padding: "9px 20px", borderRadius: 10, border: "none",
                color: "#060b18", fontWeight: 700, fontSize: 13,
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(-1px)"; t.style.boxShadow = "0 6px 24px rgba(0,229,204,0.4)"; }}
              onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}
            >
              Create Account
            </button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile-only"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          className="show-mobile-only"
          style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}
        >
          {/* Main links */}
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              onClick={() => setMobileOpen(false)}
              style={{
                color: l === "How It Works" ? COLORS.accent : "#e2e8f0",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {l}
            </a>
          ))}

          {/* Socials — expanded inline in mobile */}
          <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: 10 }}>
              Socials
            </div>
            {socialsLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 0",
                  textDecoration: "none",
                  color: COLORS.textSecondary,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <span>{icon}</span> {label}
              </a>
            ))}
          </div>

          {/* Create Account / My Account — mobile */}
          <div style={{ paddingTop: 4 }}>
            {userEmail ? (
              <div style={{ borderRadius: 12, border: "1px solid rgba(0,229,204,0.12)", overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", background: "rgba(0,229,204,0.05)", borderBottom: "1px solid rgba(0,229,204,0.08)" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.textSecondary, marginBottom: 6 }}>Signed in as</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{userEmail}</p>
                  <p style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 2 }}>Password: ••••••••</p>
                </div>
                <button
                  onClick={() => { onSignOut(); setMobileOpen(false); }}
                  style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, fontFamily: "DM Sans, sans-serif" }}
                >
                  <Key size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenModal(); setMobileOpen(false); }}
                className="btn-shimmer font-display"
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "none", color: "#060b18", fontWeight: 700, fontSize: 15, cursor: "pointer" }}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────────────────────
   EXECUTION TERMINAL — untouched
───────────────────────────────────────── */
type LogLine = {
  id: number;
  ts: string;
  msg: string;
  kind: "ok" | "signal" | "info" | "exec" | "confirm" | "skip";
};

const LOG_POOL: Omit<LogLine, "id">[] = [
  { ts:"0.001ms", msg:"POLYMARKET WSS STREAM CONNECTED",                              kind:"ok"      },
  { ts:"0.003ms", msg:'SUBSCRIBE → ["user","market","book","orderbook"]',             kind:"info"    },
  { ts:"0.004ms", msg:"WHALE SIGNAL DETECTED: 0x89Ab4F...f4a2",                      kind:"signal"  },
  { ts:"0.005ms", msg:'PARSING MARKET: "Fed Rate Cut By July — YES"',                kind:"info"    },
  { ts:"0.006ms", msg:"CONVICTION SCORE: 0.94  THRESHOLD: 0.72  → PASS",             kind:"ok"      },
  { ts:"0.007ms", msg:"POSITION SIZE: $4,200 USDC  MAX EXPOSURE: OK",                kind:"ok"      },
  { ts:"0.009ms", msg:"CONSTRUCTING LIMIT ORDER @ 0.612  SLIPPAGE BOUND: 0.1%",      kind:"info"    },
  { ts:"0.012ms", msg:"EXECUTING MIRROR ORDER → POLYMARKET CLOB",                    kind:"exec"    },
  { ts:"0.014ms", msg:"ORDER CONFIRMED  TX: 0xf3c1...8ab4  FILL: 100%",              kind:"confirm" },
  { ts:"0.015ms", msg:"POSITION LOGGED  P&L TRACKING ACTIVE",                        kind:"ok"      },
  { ts:"0.017ms", msg:"WHALE SIGNAL DETECTED: 0x3Fe07D...c91b",                      kind:"signal"  },
  { ts:"0.018ms", msg:'PARSING MARKET: "BTC $100K Before EOY — YES"',               kind:"info"    },
  { ts:"0.020ms", msg:"CONVICTION SCORE: 0.88  THRESHOLD: 0.72  → PASS",             kind:"ok"      },
  { ts:"0.021ms", msg:"POSITION SIZE: $1,850 USDC  MAX EXPOSURE: OK",                kind:"ok"      },
  { ts:"0.023ms", msg:"CONSTRUCTING MARKET ORDER  SLIPPAGE BOUND: 0.08%",            kind:"info"    },
  { ts:"0.026ms", msg:"EXECUTING MIRROR ORDER → POLYMARKET CLOB",                    kind:"exec"    },
  { ts:"0.028ms", msg:"ORDER CONFIRMED  TX: 0xa9d4...22f7  FILL: 100%",              kind:"confirm" },
  { ts:"0.030ms", msg:"PORTFOLIO REBALANCED  EXPOSURE WITHIN BOUNDS",                kind:"ok"      },
  { ts:"0.033ms", msg:"WHALE SIGNAL DETECTED: 0xB12cA9...019d",                      kind:"signal"  },
  { ts:"0.035ms", msg:'PARSING MARKET: "Trump Wins 2028 — YES"',                    kind:"info"    },
  { ts:"0.037ms", msg:"CONVICTION SCORE: 0.61  THRESHOLD: 0.72  → SKIP",             kind:"skip"    },
  { ts:"0.038ms", msg:"SIGNAL FILTERED  BELOW CONVICTION THRESHOLD",                 kind:"skip"    },
  { ts:"0.040ms", msg:"HEARTBEAT OK  LATENCY: 14.2ms  UPTIME: 99.98%",               kind:"ok"      },
  { ts:"0.042ms", msg:"WHALE SIGNAL DETECTED: 0xC9e1b2...8812",                      kind:"signal"  },
  { ts:"0.043ms", msg:'PARSING MARKET: "Recession Before 2026 — NO"',               kind:"info"    },
  { ts:"0.045ms", msg:"CONVICTION SCORE: 0.91  THRESHOLD: 0.72  → PASS",             kind:"ok"      },
  { ts:"0.046ms", msg:"EXECUTING MIRROR ORDER → POLYMARKET CLOB",                    kind:"exec"    },
  { ts:"0.048ms", msg:"ORDER CONFIRMED  TX: 0x77de...ef03  FILL: 100%",              kind:"confirm" },
];

function kindColor(k: LogLine["kind"]): string {
  return k === "ok"      ? C.accent
       : k === "signal"  ? "#fbbf24"
       : k === "exec"    ? C.accentAlt
       : k === "confirm" ? "#4ade80"
       : k === "skip"    ? C.textDim
       :                   C.textMuted;
}
function kindPrefix(k: LogLine["kind"]): string {
  return k === "ok"      ? "✓ "
       : k === "signal"  ? "⚡ "
       : k === "exec"    ? "→ "
       : k === "confirm" ? "● "
       : k === "skip"    ? "○ "
       :                   "  ";
}

function ExecutionTerminal() {
  const [lines, setLines]     = useState<LogLine[]>([]);
  const [cursorOn, setCursorOn] = useState(true);
  const poolIdx  = useRef(0);
  const nextId   = useRef(0);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const MAX = 13;

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const add = () => {
      const entry = LOG_POOL[poolIdx.current % LOG_POOL.length];
      poolIdx.current++;
      setLines(prev => {
        const next = [...prev, { ...entry, id: nextId.current++ }];
        return next.length > MAX ? next.slice(-MAX) : next;
      });
    };
    add();
    const id = setInterval(add, 860);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <div style={{
      borderRadius:16,
      background:"rgba(4,8,18,0.96)",
      border:"1px solid rgba(0,229,204,0.13)",
      boxShadow:"0 0 0 1px rgba(255,255,255,0.025), 0 40px 100px rgba(0,0,0,0.75), 0 0 70px rgba(0,229,204,0.04)",
      overflow:"hidden",
      maxWidth:680,
      margin:"0 auto",
      animation:"fade-up 0.5s ease 0.26s both",
    }}>
      {/* Title bar */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"11px 16px",
        background:"rgba(255,255,255,0.018)",
        borderBottom:"1px solid rgba(255,255,255,0.035)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", gap:6 }}>
            {(["#ff5f57","#febc2e","#28c840"] as string[]).map((col, i) => (
              <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:col, opacity:0.75 }}/>
            ))}
          </div>
          <span className="font-mono" style={{ fontSize:10, color:C.textDim, letterSpacing:"0.09em", marginLeft:8 }}>
            polywhale-engine  —  execution.log
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{
            width:6, height:6, borderRadius:"50%", background:"#28c840",
            boxShadow:"0 0 6px #28c84090",
          }}/>
          <span className="font-mono" style={{ fontSize:9, color:"#28c840", letterSpacing:"0.12em" }}>LIVE</span>
        </div>
      </div>

      {/* Log body */}
      <div ref={bodyRef} style={{
        padding:"16px 18px 12px",
        height:256,
        overflowY:"hidden",
        display:"flex",
        flexDirection:"column",
        gap:1,
      }}>
        {lines.map((line, idx) => (
          <div key={line.id} style={{
            display:"flex", gap:0, alignItems:"baseline",
            animation: idx === lines.length - 1 ? "terminal-in 0.15s ease both" : "none",
          }}>
            <span className="font-mono" style={{
              fontSize:10.5, color:"#2d4060", minWidth:70, flexShrink:0, userSelect:"none",
            }}>[{line.ts}]</span>
            <span className="font-mono" style={{
              fontSize:10.5, color: kindColor(line.kind),
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              opacity: line.kind === "skip" ? 0.45 : 1,
            }}>
              {kindPrefix(line.kind)}{line.msg}
            </span>
          </div>
        ))}

        {/* Blinking block cursor */}
        <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:3 }}>
          <span className="font-mono" style={{ fontSize:10.5, color:C.accent, userSelect:"none" }}>›</span>
          <div style={{
            width:6, height:13, borderRadius:1,
            background: cursorOn ? C.accent : "transparent",
            transition:"background 0.04s",
          }}/>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO — untouched
───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      position:"relative", padding:"110px 24px 96px",
      textAlign:"center", overflow:"hidden",
    }}>
      {/* Faint centered radial glow */}
      <div style={{
        position:"absolute", top:"28%", left:"50%",
        width:780, height:480, marginLeft:-390, marginTop:-240,
        borderRadius:"50%",
        background:"radial-gradient(ellipse,rgba(0,229,204,0.05) 0%,transparent 66%)",
        pointerEvents:"none",
      }}/>

      <div style={{ position:"relative", maxWidth:760, margin:"0 auto" }}>
        {/* Eyebrow pill */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"7px 16px", borderRadius:100,
          background:"rgba(0,229,204,0.05)", border:"1px solid rgba(0,229,204,0.09)",
          marginBottom:32, fontSize:12, color:C.accent, fontWeight:600,
          fontFamily:"DM Sans, sans-serif", animation:"fade-up 0.5s ease both",
        }}>
          <BrainCircuit size={13}/> The Science of Alpha
        </div>

        {/* H1 — natural line break keeps "Sub-Second Execution" intact */}
        <h1 className="font-syne" style={{
          fontSize:"clamp(36px,5.2vw,62px)", fontWeight:800, color:"#fff",
          letterSpacing:"-0.04em", marginBottom:24, lineHeight:1.06,
          animation:"fade-up 0.5s ease 0.08s both",
        }}>
          See the Future.<br />
          <span style={{
            background:"linear-gradient(135deg,#00e5cc 0%,#7c5cfc 100%)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
          }}>Execute in Milliseconds.</span>
        </h1>

        <p style={{
          fontSize:16, color:C.textMuted, lineHeight:1.84,
          maxWidth:500, margin:"0 auto 52px",
          animation:"fade-up 0.5s ease 0.15s both",
        }}>
          Information is useless if you can't act on it. See exactly how PolyWhale's high-frequency topology keeps you one step ahead of the crowd.
        </p>

        {/* The Execution Terminal */}
        <ExecutionTerminal/>

        {/* Scroll nudge */}
        <div style={{
          marginTop:50, display:"flex", flexDirection:"column",
          alignItems:"center", gap:10, animation:"fade-up 0.5s ease 0.35s both",
        }}>
          <span style={{ fontSize:9, color:C.textDim, textTransform:"uppercase", letterSpacing:"0.2em", fontWeight:600 }}>
            Explore the Architecture
          </span>
          <div style={{
            width:20, height:36, borderRadius:10,
            border:"1.5px solid rgba(255,255,255,0.06)",
            display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:7,
          }}>
            <div style={{
              width:3, height:7, borderRadius:2, background:C.accent, opacity:0.45,
              animation:"scroll-dot 2s ease-in-out infinite",
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   METRIC GRID — three-stat glass row
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   DATA RIBBON — full-width 3-stat enterprise strip
   Sits between the two-column layout and the Waterfall
───────────────────────────────────────── */
function DataRibbon() {
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  const metrics = [
    { v:"14.2ms", l:"Avg. Execution",   Icon:Zap,      color:C.accent    },
    { v:"<2ms",   l:"Signal Ingestion",  Icon:Activity,  color:C.accentAlt },
    { v:"99.98%", l:"Engine Uptime",     Icon:Server,    color:"#4ade80"   },
  ];

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(3, 1fr)",
      marginTop:40,
      borderRadius:16,
      background:"rgba(0,229,204,0.02)",
      border:"1px solid rgba(0,229,204,0.08)",
      overflow:"hidden",
    }}>
      {metrics.map((m, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovIdx(i)}
          onMouseLeave={() => setHovIdx(null)}
          style={{
            padding:"28px 24px",
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            textAlign:"center",
            borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
            background: hovIdx === i ? `${m.color}07` : "transparent",
            transition:"background 0.22s ease",
            cursor:"default",
          }}
        >
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"center",
            gap:8, marginBottom:10,
          }}>
            <m.Icon
              size={13}
              color={m.color}
              style={{ opacity: hovIdx === i ? 1 : 0.4, transition:"opacity 0.22s" }}
            />
            <div className="font-mono" style={{
              fontSize:26, fontWeight:700, color:m.color,
              letterSpacing:"-0.04em", lineHeight:1,
              textShadow: hovIdx === i ? `0 0 28px ${m.color}80` : "none",
              transition:"text-shadow 0.22s",
            }}>{m.v}</div>
          </div>
          <div style={{
            fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase",
            color: hovIdx === i ? C.textMuted : C.textDim,
            fontFamily:"DM Sans, sans-serif", fontWeight:600,
            transition:"color 0.22s",
          }}>{m.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   WATERFALL BREAKDOWN — interactive timeline
───────────────────────────────────────── */
function WaterfallBreakdown() {
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  const segments = [
    { label:"Network Hop",     ms:"~2ms",  pct:10, color:C.accent,     glow:"rgba(0,229,204,0.5)",    desc:"Signal received from Polymarket WSS stream co-located in EU-West-1." },
    { label:"Risk Check",      ms:"~8ms",  pct:40, color:C.accentAlt,  glow:"rgba(124,92,252,0.5)",   desc:"Position sizing, conviction threshold, exposure limits verified." },
    { label:"Order Placement", ms:"~6ms",  pct:30, color:C.accentPink, glow:"rgba(244,114,182,0.5)",  desc:"Limit/market order constructed and submitted to Polymarket CLOB." },
    { label:"Confirm + Log",   ms:"~4ms",  pct:20, color:"#4ade80",    glow:"rgba(74,222,128,0.4)",   desc:"Fill confirmed, position logged, P&L tracking initialised." },
  ];

  return (
    <div style={{
      marginTop:64, padding:"32px 32px 28px", borderRadius:18, background:C.bgDeep,
      border:"1px solid rgba(255,255,255,0.05)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.025), 0 24px 64px rgba(0,0,0,0.4)",
    }}>
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:7, height:7, borderRadius:"50%", background:C.accent,
            boxShadow:"0 0 8px rgba(0,229,204,0.7)",
            animation:"glow-pulse 2s ease-in-out infinite",
          }}/>
          <span className="font-mono" style={{ fontSize:10, color:C.textDim, letterSpacing:"0.16em", textTransform:"uppercase" }}>
            Network Waterfall Breakdown
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="font-mono" style={{ fontSize:11, color:C.accent, fontWeight:700, letterSpacing:"-0.01em" }}>
            Total: &lt;20ms
          </span>
        </div>
      </div>

      {/* Segmented bar */}
      <div style={{ display:"flex", height:36, borderRadius:10, overflow:"hidden", marginBottom:20, gap:2 }}>
        {segments.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            style={{
              flex:`0 0 ${s.pct}%`,
              background: hovIdx === i
                ? `linear-gradient(135deg, ${s.color}cc, ${s.color}88)`
                : `linear-gradient(135deg, ${s.color}55, ${s.color}33)`,
              borderRadius: i === 0 ? "9px 0 0 9px" : i === segments.length-1 ? "0 9px 9px 0" : 0,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"default",
              transform: hovIdx === i ? "scaleY(1.08)" : "scaleY(1)",
              transition:"all 0.22s cubic-bezier(.16,1,.3,1)",
              boxShadow: hovIdx === i ? `0 0 24px ${s.glow}` : "none",
              position:"relative",
            }}
          >
            {hovIdx === i && (
              <span className="font-mono" style={{
                fontSize:11, fontWeight:700, color:"#fff",
                textShadow:`0 0 12px ${s.color}`,
                letterSpacing:"-0.01em",
                pointerEvents:"none",
              }}>{s.ms}</span>
            )}
          </div>
        ))}
      </div>

      {/* Segment detail rows */}
      <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
        {segments.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            style={{
              display:"flex", alignItems:"center", gap:14,
              padding:"10px 14px", borderRadius:10, cursor:"default",
              background: hovIdx === i ? `${s.color}08` : "transparent",
              border: `1px solid ${hovIdx === i ? `${s.color}20` : "transparent"}`,
              transition:"all 0.18s ease",
            }}
          >
            {/* Colour swatch */}
            <div style={{
              width:3, height:36, borderRadius:2, flexShrink:0,
              background:`linear-gradient(180deg, ${s.color}, ${s.color}55)`,
              boxShadow: hovIdx === i ? `0 0 10px ${s.glow}` : "none",
              transition:"box-shadow 0.2s",
            }}/>
            {/* Labels */}
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:3 }}>
                <span className="font-syne" style={{ fontSize:12, fontWeight:700, color: hovIdx === i ? "#fff" : C.text }}>
                  {s.label}
                </span>
                <span className="font-mono" style={{
                  fontSize:11, fontWeight:700, color:s.color,
                  textShadow: hovIdx === i ? `0 0 14px ${s.glow}` : "none",
                  transition:"text-shadow 0.2s",
                }}>{s.ms}</span>
              </div>
              <div style={{ fontSize:11, color:C.textMuted, lineHeight:1.5,
                maxHeight: hovIdx === i ? 40 : 0, overflow:"hidden",
                transition:"max-height 0.3s ease", opacity: hovIdx === i ? 1 : 0,
              }}>
                {s.desc}
              </div>
            </div>
            {/* Pct badge */}
            <div className="font-mono" style={{
              fontSize:9, color: hovIdx === i ? s.color : C.textDim,
              padding:"3px 8px", borderRadius:5,
              background: hovIdx === i ? `${s.color}12` : "rgba(255,255,255,0.03)",
              border:`1px solid ${hovIdx === i ? `${s.color}22` : "rgba(255,255,255,0.04)"}`,
              transition:"all 0.18s",
              letterSpacing:"0.06em",
            }}>{s.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION 1 — Latency Terminal
───────────────────────────────────────── */
function LatencySection() {
  const ref = useReveal();

  const bars = [
    { label:"Human Trader",  sub:"Toronto, ON", ms:"150–300ms", pct:92, color:C.accentPink, glow:"rgba(244,114,182,0.35)" },
    { label:"Competing Bot", sub:"US-East-1",   ms:"40–80ms",   pct:30, color:"#fbbf24",    glow:"rgba(251,191,36,0.28)"  },
    { label:"PolyWhale",     sub:"EU-West-1",   ms:"<20ms",     pct:6,  color:C.accent,     glow:"rgba(0,229,204,0.45)"   },
  ];

  return (
    <section style={{ padding:"140px 24px 100px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="01" text="The Latency Advantage" color={C.accent}/>

        <div className="lat-layout" style={{ display:"flex", gap:60, alignItems:"flex-start" }}>
          <div style={{ flex:"1 1 400px" }}>
            <h2 className="font-syne" style={{
              fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
              letterSpacing:"-0.03em", marginBottom:22, lineHeight:1.1,
            }}>
              Co-Located in{" "}
              <span style={{ color:C.accent }}>EU-West&nbsp;1</span>
              <br/>Dublin, Ireland
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, marginBottom:20, maxWidth:440 }}>
              Polymarket&apos;s core exchange infrastructure lives in AWS EU-West&nbsp;1.
              A human trader in Toronto faces 150–300&thinsp;ms of round-trip latency
              before their order even touches the book. The spread has already moved.
            </p>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, marginBottom:0, maxWidth:440 }}>
              PolyWhale is co-located in the same datacenter. Detection, risk-check,
              and order-placement resolve in{" "}
              <em style={{ color:"#fff", fontStyle:"normal" }}>under 20&thinsp;milliseconds</em>.
              This is a structural advantage, not a marginal one.
            </p>
          </div>

          {/* Bloomberg Terminal Panel */}
          <div style={{ flex:"1 1 380px" }}>
            <div style={{
              padding:"26px 26px 22px", borderRadius:18,
              background:C.bgDeep,
              border:"1px solid rgba(255,255,255,0.05)",
              boxShadow:"inset 0 1px 0 rgba(255,255,255,0.025), 0 32px 80px rgba(0,0,0,0.45)",
            }}>
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:28, paddingBottom:16,
                borderBottom:"1px solid rgba(255,255,255,0.04)",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{
                    width:7, height:7, borderRadius:"50%", background:C.accent,
                    boxShadow:`0 0 8px ${C.accent}70`,
                    animation:"glow-pulse 2s ease-in-out infinite",
                  }}/>
                  <span className="font-mono" style={{
                    fontSize:10, color:C.textDim, letterSpacing:"0.14em", textTransform:"uppercase",
                  }}>Latency Monitor</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }}/>
                  <span className="font-mono" style={{ fontSize:9, color:"#22c55e", letterSpacing:"0.12em" }}>LIVE</span>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {bars.map((b, i) => (
                  <div key={i}>
                    <div style={{
                      display:"flex", justifyContent:"space-between",
                      alignItems:"flex-start", marginBottom:10, gap:8,
                    }}>
                      <div>
                        <div style={{ fontSize:12, color:C.text, fontWeight:600, marginBottom:2 }}>{b.label}</div>
                        <div className="font-mono" style={{ fontSize:10, color:C.textDim }}>{b.sub}</div>
                      </div>
                      <span className="font-mono" style={{
                        fontSize:14, fontWeight:700,
                        color: i === 2 ? C.accent : b.color,
                        letterSpacing:"-0.02em", textAlign:"right", minWidth:90, flexShrink:0,
                        textShadow: i === 2 ? "0 0 18px rgba(0,229,204,0.60)" : `0 0 12px ${b.glow}`,
                      }}>{b.ms}</span>
                    </div>
                    <div style={{
                      position:"relative", height:4, borderRadius:2,
                      background:"rgba(255,255,255,0.03)", overflow:"visible",
                    }}>
                      <div style={{
                        position:"absolute", top:0, left:0, height:"100%",
                        width:`${b.pct}%`, borderRadius:2,
                        background:`linear-gradient(90deg,${b.color}60,${b.color})`,
                        transformOrigin:"left",
                        animation:`bar-fill 1.6s cubic-bezier(.16,1,.3,1) ${i * 0.2}s both`,
                      }}>
                        <div style={{
                          position:"absolute", right:-3, top:"50%", transform:"translateY(-50%)",
                          width:9, height:9, borderRadius:"50%",
                          background:b.color,
                          boxShadow:`0 0 14px 5px ${b.glow}, 0 0 4px ${b.color}`,
                        }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display:"flex", justifyContent:"space-between",
                marginTop:22, paddingTop:16,
                borderTop:"1px solid rgba(255,255,255,0.03)",
              }}>
                {["0ms","100ms","200ms","300ms"].map((v,i) => (
                  <span key={i} className="font-mono" style={{ fontSize:9, color:C.textDim }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Full-width Data Ribbon ── */}
        <DataRibbon/>

        {/* Network Waterfall Breakdown — replaces text formula */}
        <WaterfallBreakdown/>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ARCHITECTURE TOPOLOGY MAP — untouched
───────────────────────────────────────── */
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function ArchTopologyMap() {
  const svgRef   = useRef<SVGSVGElement>(null);
  const pktADot  = useRef<SVGCircleElement>(null);
  const pktAGlow = useRef<SVGCircleElement>(null);
  const pktBDot  = useRef<SVGCircleElement>(null);
  const pktBGlow = useRef<SVGCircleElement>(null);
  const rafId    = useRef(0);

  useEffect(() => {
    const PERIOD = 1500;
    let t0: number | null = null;

    const frame = (ts: number) => {
      if (!svgRef.current) { rafId.current = requestAnimationFrame(frame); return; }
      if (!t0) t0 = ts;

      const W    = svgRef.current.clientWidth  || 900;
      const H    = svgRef.current.clientHeight || 200;
      const yMid = H / 2;

      const xL = W * 0.118;
      const xC = W * 0.500;
      const xR = W * 0.882;

      const tA  = ((ts - t0) % PERIOD) / PERIOD;
      const xA  = xL + (xC - xL) * easeInOut(tA);
      const opA = tA < 0.07 ? tA / 0.07 : tA > 0.93 ? (1 - tA) / 0.07 : 1;

      const tB  = ((ts - t0 + PERIOD * 0.51) % PERIOD) / PERIOD;
      const xB  = xC + (xR - xC) * easeInOut(tB);
      const opB = tB < 0.07 ? tB / 0.07 : tB > 0.93 ? (1 - tB) / 0.07 : 1;

      ([pktADot, pktAGlow] as typeof pktADot[]).forEach(r => {
        if (!r.current) return;
        r.current.setAttribute("cx", xA.toFixed(1));
        r.current.setAttribute("cy", String(yMid));
        r.current.setAttribute("opacity", opA.toFixed(3));
      });
      ([pktBDot, pktBGlow] as typeof pktBDot[]).forEach(r => {
        if (!r.current) return;
        r.current.setAttribute("cx", xB.toFixed(1));
        r.current.setAttribute("cy", String(yMid));
        r.current.setAttribute("opacity", opB.toFixed(3));
      });

      rafId.current = requestAnimationFrame(frame);
    };

    rafId.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <div style={{ position:"relative" }}>
      {/* SVG layer — sits between boxes via absolute positioning */}
      <svg
        ref={svgRef}
        width="100%"
        height="200"
        style={{
          position:"absolute", top:"50%", left:0,
          transform:"translateY(-50%)",
          overflow:"visible", pointerEvents:"none", zIndex:0,
        }}
      >
        <defs>
          <linearGradient id="segAC" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={C.accent}    stopOpacity="0.45"/>
            <stop offset="100%" stopColor={C.accentAlt} stopOpacity="0.45"/>
          </linearGradient>
          <linearGradient id="segCR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={C.accentAlt}  stopOpacity="0.45"/>
            <stop offset="100%" stopColor={C.accentPink} stopOpacity="0.45"/>
          </linearGradient>
          <filter id="gA" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
          <filter id="gB" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
        </defs>

        {/* Track lines — static dashed */}
        <line x1="13%" y1="50%" x2="44%" y2="50%"
          stroke="url(#segAC)" strokeWidth="1.5" strokeDasharray="5 9"/>
        <line x1="56%" y1="50%" x2="87%" y2="50%"
          stroke="url(#segCR)" strokeWidth="1.5" strokeDasharray="5 9"/>

        {/* Arrow chevrons */}
        <polyline points="27%,44% 30%,50% 27%,56%"
          fill="none" stroke="rgba(0,229,204,0.28)"
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="70%,44% 73%,50% 70%,56%"
          fill="none" stroke="rgba(124,92,252,0.28)"
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Packet A glow + dot */}
        <circle ref={pktAGlow} r="11" fill={C.accent}    opacity="0" filter="url(#gA)"/>
        <circle ref={pktADot}  r="4"  fill={C.accent}    opacity="0"/>

        {/* Packet B glow + dot */}
        <circle ref={pktBGlow} r="11" fill={C.accentAlt} opacity="0" filter="url(#gB)"/>
        <circle ref={pktBDot}  r="4"  fill={C.accentAlt} opacity="0"/>
      </svg>

      {/* Three boxes row */}
      <div className="arch-row" style={{
        display:"flex", alignItems:"center",
        gap:0, position:"relative", zIndex:1,
      }}>
        {/* LEFT — Whale Wallets */}
        <ArchSideNode
          icon={<Users size={20}/>}
          color={C.accent}
          label="Whale Wallets"
          sublabel="1,200+ monitored"
          items={["Real-time WSS feed", "On-chain events", "Signal filtering"]}
          pulse
        />

        <div style={{ flex:1 }}/>

        {/* CENTER — Core Engine */}
        <ArchCenterNode/>

        <div style={{ flex:1 }}/>

        {/* RIGHT — User Portfolio */}
        <ArchSideNode
          icon={<TrendingUp size={20}/>}
          color={C.accentPink}
          label="User Portfolio"
          sublabel="Your Polymarket account"
          items={["Mirrored orders", "Live P&L tracking", "Risk-adjusted size"]}
          pulse={false}
        />
      </div>

      {/* Legend */}
      <div style={{
        display:"flex", justifyContent:"center", gap:28, marginTop:44, flexWrap:"wrap",
      }}>
        {[
          { label:"Signal ingest",     color:C.accent    },
          { label:"Engine processing", color:C.accentAlt },
          { label:"Order placement",   color:C.accentPink},
        ].map((l, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:22, height:2, borderRadius:1, background:l.color, opacity:0.55 }}/>
            <span style={{ fontSize:11, color:C.textDim }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchSideNode({ icon, color, label, sublabel, items, pulse }: {
  icon: React.ReactNode;
  color: string;
  label: string;
  sublabel: string;
  items: string[];
  pulse: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:184, flexShrink:0, padding:"24px 18px 20px", borderRadius:16, textAlign:"center",
        background: hov ? `${color}09` : "#090f1e",
        border:`1px solid ${hov ? `${color}28` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hov ? `0 0 40px ${color}12` : "none",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition:"all 0.3s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {/* Icon — pulse is a tight box-shadow on the icon itself, not a bleeding ring */}
      <div style={{ display:"inline-flex", marginBottom:14 }}>
        <div style={{
          width:48, height:48, borderRadius:13,
          background:`${color}0d`, border:`1px solid ${color}22`,
          display:"flex", alignItems:"center", justifyContent:"center", color,
          /* Tight glow-pulse confined strictly to this box */
          animation: pulse ? "glow-pulse 2.2s ease-in-out infinite" : "none",
          transition:"box-shadow 0.3s",
        }}>{icon}</div>
      </div>

      <div className="font-syne" style={{
        fontSize:13, fontWeight:700, color:"#fff", marginBottom:4, letterSpacing:"-0.01em",
      }}>{label}</div>
      <div style={{
        fontSize:11, color:C.textDim, marginBottom:16, lineHeight:1.4,
      }}>{sublabel}</div>

      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            fontSize:10, color, fontFamily:"JetBrains Mono, monospace", fontWeight:600,
            padding:"5px 9px", borderRadius:7,
            background:`${color}08`, border:`1px solid ${color}12`,
            letterSpacing:"0.04em", lineHeight:1.3,
          }}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function ArchCenterNode() {
  return (
    <div style={{
      width:248, flexShrink:0, padding:"28px 22px", borderRadius:20, textAlign:"center",
      background:"linear-gradient(160deg,rgba(0,229,204,0.05) 0%,rgba(6,11,24,0.98) 55%,rgba(124,92,252,0.05) 100%)",
      animation:"engine-glow 4s ease-in-out infinite",
      position:"relative",
    }}>
      {/* Top gradient bar */}
      <div style={{
        position:"absolute", top:0, left:"18%", right:"18%", height:2,
        background:"linear-gradient(90deg,transparent,#00e5cc80,#7c5cfc80,transparent)",
        borderRadius:1,
      }}/>

      <div style={{ position:"relative", display:"inline-flex", marginBottom:16 }}>
        <div style={{
          width:58, height:58, borderRadius:16,
          background:"linear-gradient(135deg,rgba(0,229,204,0.13),rgba(124,92,252,0.10))",
          border:"1px solid rgba(0,229,204,0.22)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <Cpu size={26} color={C.accent}/>
        </div>
        <div style={{
          position:"absolute", inset:-9, borderRadius:24,
          border:"1px solid rgba(0,229,204,0.09)",
          animation:"signal-ring 2.6s ease-out infinite",
          pointerEvents:"none",
        }}/>
      </div>

      <div className="font-syne" style={{
        fontSize:14, fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginBottom:3,
      }}>PolyWhale Core Engine</div>
      <div className="font-mono" style={{
        fontSize:9, color:C.accent, letterSpacing:"0.12em",
        textTransform:"uppercase", marginBottom:18,
      }}>EU-West 1 · Dublin</div>

      {/* Metrics row */}
      <div style={{
        display:"flex", borderRadius:10, overflow:"hidden",
        border:"1px solid rgba(255,255,255,0.05)", marginBottom:16,
      }}>
        {[{ v:"14.2ms", l:"latency"}, { v:"99.98%", l:"uptime"}].map((m, i) => (
          <div key={i} style={{
            flex:1, padding:"9px 6px", textAlign:"center",
            background:"rgba(0,0,0,0.32)",
            borderRight: i === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <div className="font-mono" style={{ fontSize:13, fontWeight:700, color:C.accent }}>{m.v}</div>
            <div style={{ fontSize:9, color:C.textDim, marginTop:2, textTransform:"uppercase", letterSpacing:"0.08em" }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* Pipeline stage tags */}
      {["Signal Parser","Risk Engine","Order Constructor"].map((s, i) => (
        <div key={i} style={{
          display:"flex", alignItems:"center", gap:8,
          padding:"6px 10px", borderRadius:8, marginBottom:6,
          background:"rgba(255,255,255,0.022)",
          border:"1px solid rgba(255,255,255,0.04)",
        }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:C.accent, flexShrink:0, opacity:0.6 }}/>
          <span className="font-mono" style={{ fontSize:9, color:C.textMuted, letterSpacing:"0.06em" }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function MirroringSection() {
  const ref = useReveal();
  return (
    <section style={{ padding:"100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="02" text="Infrastructure Architecture" color={C.accentAlt}/>

        <div style={{ marginBottom:56 }}>
          <h2 className="font-syne" style={{
            fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
            letterSpacing:"-0.03em", marginBottom:18, lineHeight:1.1,
          }}>
            A{" "}<span style={{ color:C.accentAlt }}>Three-Node</span>{" "}
            Trade Topology
          </h2>
          <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, maxWidth:540 }}>
            Every mirrored trade transits a deterministic three-node architecture —
            whale signal feeds into the co-located engine, which fires an order
            into your portfolio before the market moves.
          </p>
        </div>

        <ArchTopologyMap/>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SECURITY FEATURE LIST — extracted so useState
   is called at component level, not inside .map()
───────────────────────────────────────── */
type SecFeature = {
  Icon: React.ComponentType<{ size: number }>;
  color: string;
  title: string;
  desc: string;
  sub: string;
};

function SecurityFeatureList({ features }: { features: SecFeature[] }) {
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      {features.map((f, i) => {
        const hov = hovIdx === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            style={{
              display:"flex", gap:16, alignItems:"flex-start",
              padding:"18px 20px",
              borderRadius:14,
              background: hov ? `${f.color}07` : "rgba(255,255,255,0.015)",
              border:`1px solid ${hov ? `${f.color}1e` : "rgba(255,255,255,0.04)"}`,
              transform: hov ? "translateX(5px)" : "translateX(0)",
              transition:"all 0.25s cubic-bezier(.16,1,.3,1)",
              cursor:"default",
            }}
          >
            {/* Icon box */}
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0,
              background:`${f.color}0c`, border:`1px solid ${f.color}1a`,
              display:"flex", alignItems:"center", justifyContent:"center",
              color: f.color,
              transform: hov ? "rotate(-5deg) scale(1.08)" : "rotate(0) scale(1)",
              transition:"transform 0.25s cubic-bezier(.16,1,.3,1)",
            }}>
              <f.Icon size={16}/>
            </div>

            {/* Text block */}
            <div style={{ flex:1, minWidth:0 }}>
              <div className="font-syne" style={{
                fontSize:13, fontWeight:700,
                color: hov ? "#fff" : C.text,
                marginBottom:4, letterSpacing:"-0.01em",
                transition:"color 0.2s",
              }}>{f.title}</div>

              {/* Full desc — slides down on hover */}
              <div style={{
                fontSize:12, lineHeight:1.68, color:C.textMuted,
                maxHeight: hov ? 120 : 0,
                overflow:"hidden",
                opacity: hov ? 1 : 0,
                transition:"max-height 0.32s ease, opacity 0.22s ease",
              }}>{f.desc}</div>

              {/* One-liner — visible when collapsed */}
              <div style={{
                fontSize:11, color:C.textDim,
                maxHeight: hov ? 0 : 18,
                overflow:"hidden",
                opacity: hov ? 0 : 1,
                transition:"max-height 0.32s ease, opacity 0.18s ease",
              }}>{f.sub}</div>
            </div>

            {/* Right accent bar */}
            <div style={{
              width:2, alignSelf:"stretch", borderRadius:2, flexShrink:0,
              background:`linear-gradient(180deg, ${f.color}, ${f.color}22)`,
              opacity: hov ? 1 : 0,
              transition:"opacity 0.22s",
            }}/>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION 3 — Security Architecture & API Console
───────────────────────────────────────── */
function SecuritySection() {
  const ref = useReveal();
  const [shieldHov, setShieldHov] = useState(false);

  /* JSON lines with syntax data */
  const jsonLines: { indent: number; content: React.ReactNode }[] = [
    { indent:0, content: <span style={{ color:"rgba(255,255,255,0.25)" }}>{"{"}</span> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;api_version&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"#e9c46a" }}>&quot;v2.4.1&quot;</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;key_scope&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:C.accent }}>&quot;TRADE_ONLY&quot;</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;issued_to&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"#e9c46a" }}>&quot;polywhale-engine-eu1&quot;</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;permissions&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"rgba(255,255,255,0.25)" }}>{"{"}</span></> },
    { indent:2, content: <><span style={{ color:C.accent }}>&quot;read_positions&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:C.accent, fontWeight:700 }}>true</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:2, content: <><span style={{ color:C.accent }}>&quot;execute_orders&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:C.accent, fontWeight:700 }}>true</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:2, content: <><span style={{ color:C.accent }}>&quot;cancel_orders&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:C.accent, fontWeight:700 }}>true</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:2, content:
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(244,114,182,0.08)", borderRadius:6,
          padding:"2px 8px 2px 6px",
          border:"1px solid rgba(244,114,182,0.18)",
        }}>
          <span style={{ color:C.accentPink }}>&quot;withdraw_funds&quot;</span>
          <span style={{ color:"rgba(255,255,255,0.2)" }}>: </span>
          <span style={{ color:C.accentPink, fontWeight:700 }}>false</span>
          <span style={{ fontSize:9, color:C.accentPink, fontWeight:700, letterSpacing:"0.08em",
            background:"rgba(244,114,182,0.12)", padding:"1px 5px", borderRadius:4, marginLeft:4,
          }}>BLOCKED</span>
        </div>
    },
    { indent:1, content: <><span style={{ color:"rgba(255,255,255,0.25)" }}>{"}"}</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;encryption&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"#e9c46a" }}>&quot;AES-256-GCM&quot;</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;transport&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"#e9c46a" }}>&quot;TLS 1.3&quot;</span><span style={{ color:"rgba(255,255,255,0.15)" }}>,</span></> },
    { indent:1, content: <><span style={{ color:C.accentAlt }}>&quot;vault_access&quot;</span><span style={{ color:"rgba(255,255,255,0.2)" }}>: </span><span style={{ color:"#e9c46a" }}>&quot;zero-trust / isolated&quot;</span></> },
    { indent:0, content: <span style={{ color:"rgba(255,255,255,0.25)" }}>{"}"}</span> },
  ];

  /* Security features for right column */
  const secFeatures: SecFeature[] = [
    {
      Icon: Key, color: C.accent,
      title: "Trade-Only Permissions",
      sub: "API scope · trade only · no withdrawals",
      desc: "We request only the minimum API scope required to mirror trades. Withdrawal is structurally impossible — not a policy promise, a hard technical boundary.",
    },
    {
      Icon: Shield, color: C.accentAlt,
      title: "Funds Stay on Polymarket",
      sub: "Non-custodial · USDC stays in your account",
      desc: "Your USDC balance never leaves your Polymarket account. PolyWhale is a pure execution SaaS layer — not a custodian or wallet provider.",
    },
    {
      Icon: Fingerprint, color: C.accentPink,
      title: "Instant Key Revocation",
      sub: "Revoke instantly from Polymarket settings",
      desc: "Regenerate or delete your API key from Polymarket settings at any time. Bot access cuts off instantly with zero risk to your balance.",
    },
    {
      Icon: ShieldCheck, color: "#fbbf24",
      title: "AES-256-GCM Encryption",
      sub: "AES-256-GCM at rest · TLS 1.3 in transit",
      desc: "All credentials encrypted at rest with AES-256-GCM and in transit over TLS 1.3. Stored in an isolated zero-trust vault with automatic rotation.",
    },
  ];

  return (
    <section style={{ padding:"100px 24px 140px" }}>
      <div ref={ref} className="rv" style={{ maxWidth:1000, margin:"0 auto" }}>
        <SectionLabel num="03" text="Secure API Integration" color={C.accentPink}/>

        {/* Section header */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:20, marginBottom:52, flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 440px" }}>
            <h2 className="font-syne" style={{
              fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff",
              letterSpacing:"-0.03em", marginBottom:22, lineHeight:1.1,
            }}>
              Your Funds{" "}
              <span style={{ color:C.accentPink }}>Never Leave</span>
              <br/>Polymarket
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.textMuted, maxWidth:480 }}>
              PolyWhale is a pure execution layer. We integrate using the minimum
              possible scoped permissions. Your capital is never at risk from our
              infrastructure — only from the markets themselves.
            </p>
          </div>
          <div
            onMouseEnter={() => setShieldHov(true)}
            onMouseLeave={() => setShieldHov(false)}
            style={{
              width:70, height:70, borderRadius:17, flexShrink:0, marginTop:8,
              background:"rgba(244,114,182,0.03)", border:"1px solid rgba(244,114,182,0.08)",
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"default",
            }}
          >
            <div style={{
              color:C.accentPink,
              transition:"filter 0.3s, transform 0.3s",
              filter: shieldHov ? "drop-shadow(0 0 16px rgba(244,114,182,0.7))" : "none",
              transform: shieldHov ? "scale(1.14)" : "scale(1)",
            }}>
              <Shield size={30}/>
            </div>
          </div>
        </div>

        {/* ── Two-column: API Console + Security Features ── */}
        <div className="perm-grid" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start",
        }}>

          {/* LEFT — Glassmorphism JSON API Console */}
          <div style={{
            borderRadius:16,
            background:"rgba(4,8,18,0.97)",
            border:"1px solid rgba(0,229,204,0.09)",
            boxShadow:"0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.025)",
            overflow:"hidden",
          }}>
            {/* Window chrome */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 16px",
              background:"rgba(255,255,255,0.018)",
              borderBottom:"1px solid rgba(255,255,255,0.035)",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ display:"flex", gap:6 }}>
                  {(["#ff5f57","#febc2e","#28c840"] as string[]).map((col, i) => (
                    <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:col, opacity:0.7 }}/>
                  ))}
                </div>
                <span className="font-mono" style={{
                  fontSize:10, color:C.textDim, letterSpacing:"0.09em", marginLeft:6,
                }}>
                  polymarket-api  —  key_info.json
                </span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{
                  width:5, height:5, borderRadius:"50%", background:C.accent,
                  boxShadow:`0 0 6px ${C.accent}90`,
                }}/>
                <span className="font-mono" style={{ fontSize:9, color:C.accent, letterSpacing:"0.12em" }}>200 OK</span>
              </div>
            </div>

            {/* Line-number gutter + JSON body */}
            <div style={{ display:"flex", padding:"20px 0" }}>
              {/* Line numbers */}
              <div style={{
                paddingLeft:16, paddingRight:12,
                borderRight:"1px solid rgba(255,255,255,0.04)",
                userSelect:"none",
              }}>
                {jsonLines.map((_, i) => (
                  <div key={i} className="font-mono" style={{
                    fontSize:11, lineHeight:"1.9", color:"#2d4060", textAlign:"right",
                  }}>{i + 1}</div>
                ))}
              </div>
              {/* Code body */}
              <div style={{ paddingLeft:18, paddingRight:20, flex:1, overflow:"hidden" }}>
                {jsonLines.map((line, i) => (
                  <div key={i} className="font-mono" style={{
                    fontSize:11.5, lineHeight:"1.9",
                    paddingLeft: line.indent * 18,
                    whiteSpace:"nowrap",
                  }}>
                    {line.content}
                  </div>
                ))}
              </div>
            </div>

            {/* Console footer */}
            <div style={{
              borderTop:"1px solid rgba(255,255,255,0.035)",
              padding:"8px 16px",
              background:"rgba(255,255,255,0.012)",
              display:"flex", alignItems:"center", gap:8,
            }}>
              <Lock size={10} color={C.accent} style={{ opacity:0.6 }}/>
              <span className="font-mono" style={{ fontSize:9, color:C.textDim, letterSpacing:"0.08em" }}>
                Scope verified · withdraw_funds structurally blocked · read-only audit log
              </span>
            </div>
          </div>

          {/* RIGHT — Security feature vertical list */}
          <SecurityFeatureList features={secFeatures}/>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA — untouched
───────────────────────────────────────── */
function FinalCTA() {
  const ref = useReveal();
  return (
    <section style={{ padding:"20px 24px 140px" }}>
      <div ref={ref} className="rv" style={{
        maxWidth:820, margin:"0 auto", padding:"64px 48px",
        borderRadius:24, position:"relative", overflow:"hidden",
        background:"linear-gradient(145deg,rgba(0,229,204,0.04),rgba(124,92,252,0.06))",
        border:"1px solid rgba(255,255,255,0.05)", textAlign:"center",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03)",
      }}>
        <div style={{
          position:"absolute", top:"-35%", right:"-12%", width:340, height:340,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(124,92,252,0.09),transparent 70%)", pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute", bottom:"-30%", left:"-8%", width:270, height:270,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,204,0.07),transparent 70%)", pointerEvents:"none",
        }}/>

        <div style={{ position:"relative" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:100,
            background:"rgba(124,92,252,0.06)", border:"1px solid rgba(124,92,252,0.10)",
            marginBottom:28, fontSize:12, color:C.accentAlt, fontWeight:600, fontFamily:"DM Sans, sans-serif",
          }}>
            <Crown size={13}/> Join the Smart Money
          </div>

          <h2 className="font-syne" style={{
            fontSize:"clamp(28px,4vw,46px)", fontWeight:800, color:"#fff",
            marginBottom:18, letterSpacing:"-0.03em", lineHeight:1.1,
          }}>
            Ready to Join the{" "}
            <span style={{
              background:"linear-gradient(135deg,#00e5cc,#7c5cfc)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>Top&nbsp;1%</span>?
          </h2>

          <p style={{ fontSize:16, color:C.textMuted, maxWidth:450, margin:"0 auto 40px", lineHeight:1.82 }}>
            Every millisecond you wait is a millisecond the whales are ahead.
            Pick a plan and start mirroring alpha today.
          </p>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/pricing" className="btn-shimmer font-syne" style={{
              padding:"15px 34px", borderRadius:13, border:"none", cursor:"pointer",
              color:"#060b18", fontWeight:700, fontSize:15,
              display:"inline-flex", alignItems:"center", gap:9,
              textDecoration:"none", transition:"transform 0.2s,box-shadow 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px) scale(1.02)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 10px 36px rgba(0,229,204,0.36)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0) scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="none"; }}
            >
              View Pricing <ArrowRight size={15}/>
            </a>
            <a href="/whales" className="font-syne" style={{
              padding:"15px 26px", borderRadius:13, cursor:"pointer",
              background:"rgba(124,92,252,0.05)", border:"1px solid rgba(124,92,252,0.12)",
              color:C.accentAlt, fontWeight:600, fontSize:14,
              display:"inline-flex", alignItems:"center", gap:8,
              textDecoration:"none", transition:"all 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(124,92,252,0.10)"; (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(124,92,252,0.26)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(124,92,252,0.05)"; (e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(124,92,252,0.12)"; }}
            >
              Browse Whales <ExternalLink size={13}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ROOT PAGE
   <GlobalStyles /> rendered at the very top of the return,
   exactly as required — this is what loads the fonts and .glass class.
   ═══════════════════════════════════════ */
export default function HowItWorksPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalOpen, setModalOpen]       = useState<boolean>(false);
  const [userEmail, setUserEmail]       = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("pw_user_email");
  });

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <GlobalStyles />
      <div className="grid-bg" style={{ position:"fixed", inset:0, opacity:0.25, pointerEvents:"none" }}/>

      <Header
        onOpenModal={() => setModalOpen(true)}
        userEmail={userEmail}
        onSignOut={() => {
          localStorage.removeItem("pw_user_email");
          setUserEmail(null);
        }}
      />

      <main style={{ position:"relative", paddingTop: 80 }}>
        <Hero/>
        <LatencySection/>
        <MirroringSection/>
        <SecuritySection/>
        <FinalCTA/>

        <footer style={{ borderTop:"1px solid rgba(255,255,255,0.04)", padding:"34px 24px", textAlign:"center" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, color:C.textDim }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display:"flex", gap:16 }}>
              {["Terms","Privacy","Risk Disclosure"].map((s,i)=>(
                <a key={i} href="#" style={{ fontSize:11, color:C.textDim, textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color=C.accent)}
                  onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color=C.textDim)}
                >{s}</a>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {modalOpen && (
        <SignUpModal
          onClose={() => setModalOpen(false)}
          onSuccess={(email) => {
            localStorage.setItem("pw_user_email", email);
            setUserEmail(email);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}