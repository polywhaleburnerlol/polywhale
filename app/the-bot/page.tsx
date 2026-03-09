"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Waves,
  Zap,
  Shield,
  ArrowRight,
  ChevronRight,
  Activity,
  Menu,
  X,
  Server,
  BrainCircuit,
  Crosshair,
  Filter,
  Eye,
  EyeOff,
  User,
  TrendingUp,
  Key,
  Terminal,
  Settings,
  RefreshCw,
  ShieldAlert,
  Crown,
  ExternalLink,
  Landmark,
  Coins,
  Trophy,
  FlaskConical,
  Tv,
  Globe,
  Cpu,
} from "lucide-react";

/* ─── palette ─── */
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

/* ─── global styles ─── */
function GlobalStyles(): React.JSX.Element {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

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
      .font-mono { font-family: 'JetBrains Mono', monospace; }

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
      .ticker-track {
        animation: scroll-left 45s linear infinite;
      }
      .ticker-track:hover {
        animation-play-state: paused;
      }

      .reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

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

      /* Interactive icon animations */
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

      /* ─── the-bot page-specific ─── */
      @keyframes status-glow {
        0%, 100% { box-shadow: 0 0 6px rgba(0,229,204,0.2); }
        50% { box-shadow: 0 0 20px rgba(0,229,204,0.6), 0 0 40px rgba(0,229,204,0.15); }
      }
      @keyframes execute-pulse {
        0%, 100% { box-shadow: 0 0 8px rgba(0,229,204,0.5); transform: scale(1); }
        50% { box-shadow: 0 0 22px rgba(0,229,204,0.9), 0 0 44px rgba(0,229,204,0.3); transform: scale(1.04); }
      }
      @keyframes pending-pulse {
        0%, 100% { opacity: 0.45; }
        50% { opacity: 1; }
      }
      @keyframes feed-row-in {
        from { opacity: 0; transform: translateX(-16px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes live-dot {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      @keyframes orb-float-a {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(40px, -30px) scale(1.04); }
        66% { transform: translate(-20px, 20px) scale(0.97); }
      }
      @keyframes orb-float-b {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-40px, 25px) scale(0.96); }
        66% { transform: translate(30px, -40px) scale(1.03); }
      }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }

      @media(max-width:768px){
        .hide-mobile{display:none!important}
        .show-mobile-only{display:block!important}
        .feat-grid{grid-template-columns:1fr!important}
        .dash-halves{grid-template-columns:1fr!important}
      }
      @media(min-width:769px){
        .show-mobile-only{display:none!important}
      }
      @media(max-width:900px){
        .hero-grid{grid-template-columns:1fr!important}
        .hide-on-wrap{display:none!important}
      }
      @media(max-width:768px){
        .footer-grid{grid-template-columns:1fr 1fr!important}
      }

      /* ─── Range slider ─── */
      .pw-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
        border: none;
        background: transparent;
      }
      .pw-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid #060b18;
        box-shadow: 0 0 0 2px rgba(0,229,204,0.4), 0 0 16px rgba(0,229,204,0.5);
        cursor: pointer;
        transition: box-shadow 0.2s;
      }
      .pw-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid #060b18;
        box-shadow: 0 0 0 2px rgba(0,229,204,0.4), 0 0 16px rgba(0,229,204,0.5);
        cursor: pointer;
      }
      .pw-slider::-webkit-slider-thumb:hover {
        box-shadow: 0 0 0 3px rgba(0,229,204,0.5), 0 0 24px rgba(0,229,204,0.7);
      }
    `}</style>
  );
}

/* ─── Intersection Observer hook ─── */
function useReveal(threshold: number = 0.15): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ═══════════════════════════════════════
   HEADER  (exact copy from source of truth)
   Only change: "The Bot" highlighted as active
   ═══════════════════════════════════════ */
function Header({
  isSubscribed,
  setIsSubscribed,
  onOpenModal,
  userEmail,
  onSignOut,
}: {
  isSubscribed: boolean;
  setIsSubscribed: (v: boolean) => void;
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

  /* Close socials dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (socialsRef.current && !socialsRef.current.contains(e.target as Node)) {
        setSocialsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Exact nav links as specified ──
  const navLinks = ["The Bot", "Whales", "Pricing", "How It Works"];

  const getLinkHref = (label: string): string => {
    if (label === "The Bot")      return "/the-bot";
    if (label === "Whales")       return "/whales";
    if (label === "Pricing")      return "/pricing";
    if (label === "How It Works") return "/how-it-works";
    return "#";
  };

  const socialsLinks = [
    { label: "Discord",   href: "#", icon: "💬" },
    { label: "Telegram",  href: "#", icon: "✈️" },
    { label: "X",         href: "#", icon: "𝕏" },
  ];

  /* Shared link style */
  const linkStyle: React.CSSProperties = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.01em",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  };

  /* ── active page identifier ── */
  const activePage = "The Bot";

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

          {/* Main links */}
          {navLinks.map((l) => (
            <a
              key={l}
              href={getLinkHref(l)}
              style={{
                ...linkStyle,
                color: l === activePage ? COLORS.accent : "#e2e8f0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = l === activePage ? COLORS.accent : "#e2e8f0")}
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

            {/* Glassmorphism Dropdown panel */}
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

          {/* PRO Active / Free Tier developer toggle */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(124,92,252,0.3)"}`,
              background: isSubscribed ? "rgba(0,229,204,0.08)" : "rgba(124,92,252,0.08)",
              color: isSubscribed ? COLORS.accent : COLORS.accentAlt,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {isSubscribed ? <Eye size={14} /> : <EyeOff size={14} />}
            {isSubscribed ? "PRO Active" : "Free Tier"}
            <div
              style={{
                width: 32,
                height: 18,
                borderRadius: 9,
                background: isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(255,255,255,0.1)",
                position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isSubscribed ? COLORS.accent : COLORS.textSecondary,
                  position: "absolute",
                  top: 2,
                  left: isSubscribed ? 16 : 2,
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: isSubscribed ? "0 0 8px rgba(0,229,204,0.5)" : "none",
                }}
              />
            </div>
          </button>

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
                    { label: "Dashboard", href: "/dashboard", icon: <Activity size={13} /> },
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
                color: l === activePage ? COLORS.accent : "#e2e8f0",
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

          {/* PRO toggle */}
          <div style={{ paddingTop: 12 }}>
            <button
              onClick={() => { setIsSubscribed(!isSubscribed); setMobileOpen(false); }}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: `1px solid ${isSubscribed ? "rgba(0,229,204,0.3)" : "rgba(124,92,252,0.3)"}`,
                background: isSubscribed ? "rgba(0,229,204,0.08)" : "rgba(124,92,252,0.08)",
                color: isSubscribed ? COLORS.accent : COLORS.accentAlt,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {isSubscribed ? <Eye size={16} /> : <EyeOff size={16} />}
              {isSubscribed ? "PRO Active — Click to disable" : "Free Tier — Click to upgrade"}
            </button>
          </div>

          {/* Create Account / My Account — mobile */}
          <div style={{ paddingTop: 8 }}>
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

/* ═══════════════════════════════════════
   SIGN-UP MODAL
   ═══════════════════════════════════════ */
function SignUpModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (email: string) => void }): React.JSX.Element {
  const [email, setEmail]           = useState<string>("");
  const [password, setPassword]     = useState<string>("");
  const [showPass, setShowPass]     = useState<boolean>(false);
  const [focusedField, setFocused]  = useState<string | null>(null);
  const [loading, setLoading]       = useState<boolean>(false);
  const [error, setError]           = useState<string | null>(null);
  const [fieldErrs, setFieldErrs]   = useState<{ email?: string; password?: string }>({});

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

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
    if (password.length >= 8)           s++;
    if (password.length >= 12)          s++;
    if (/[A-Z]/.test(password))         s++;
    if (/[0-9]/.test(password))         s++;
    if (/[^A-Za-z0-9]/.test(password))  s++;
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
      if (!res.ok) { setError(data.message ?? "Something went wrong. Please try again."); }
      else         { onSuccess(email); window.location.href = "/pricing"; }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <X size={14} />
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
          <button type="submit" disabled={loading} className="btn-shimmer font-display"
            style={{ marginTop: 4, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? "rgba(0,229,204,0.3)" : undefined, color: loading ? "rgba(255,255,255,0.5)" : "#060b18", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { if (!loading) { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(-1px)"; t.style.boxShadow = "0 8px 28px rgba(0,229,204,0.4)"; } }}
            onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}>
            {loading ? (<><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}><style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" /></svg>Creating account…</>) : (<><User size={16} /> Start trading free →</>)}
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(130,146,166,0.6)", lineHeight: 1.6 }}>
            Already have an account?{" "}<a href="/login" style={{ color: COLORS.accent, textDecoration: "none", fontWeight: 600 }}>Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════ */
function SectionLabel({ num, text, color }: { num: string; text: string; color: string }): React.JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
      <span className="font-mono" style={{
        fontSize: 11, fontWeight: 700, color, letterSpacing: "0.08em",
        padding: "5px 12px", borderRadius: 8,
        background: `${color}10`, border: `1px solid ${color}20`,
      }}>{num}</span>
      <span className="font-display" style={{
        fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.14em",
      }}>{text}</span>
    </div>
  );
}


/* ═══════════════════════════════════════
   HERO: "The Command Center"
   Interactive Terminal Dashboard
   ═══════════════════════════════════════ */
function HeroSection(): React.JSX.Element {
  const [maxSize, setMaxSize] = useState(2700);
  const [selectedCats, setSelectedCats] = useState<string[]>(["Politics", "Crypto"]);
  const [riskProfile, setRiskProfile] = useState("Balanced");

  const toggleCat = (cat: string) =>
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const categories = [
    { label: "Politics",    icon: <Landmark size={15} /> },
    { label: "Crypto",      icon: <Coins size={15} /> },
    { label: "Sports",      icon: <Trophy size={15} /> },
    { label: "Business",    icon: <TrendingUp size={15} /> },
    { label: "Science",     icon: <FlaskConical size={15} /> },
    { label: "Pop Culture", icon: <Tv size={15} /> },
    { label: "Macro",       icon: <Globe size={15} /> },
    { label: "Tech",        icon: <Cpu size={15} /> },
  ];

  const risks = [
    { label: "Conservative", color: "#00e5cc", glow: "rgba(0,229,204,0.15)",    desc: "Low exposure, high selectivity"   },
    { label: "Balanced",     color: "#7c5cfc", glow: "rgba(124,92,252,0.15)",   desc: "Optimized risk-reward ratio"      },
    { label: "Degen",        color: "#ff3b3b", glow: "rgba(255,59,59,0.15)",    desc: "Maximum alpha, higher volatility" },
  ];

  /* Derived fill % for the slider track */
  const fillPct = ((maxSize - 0) / (5000 - 0)) * 100;

  return (
    <section style={{ padding: "160px 24px 120px", position: "relative", overflow: "hidden" }}>
      {/* Subtle background orbs */}
      <div style={{
        position: "absolute", top: "15%", left: "50%", width: 800, height: 800,
        marginLeft: -400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,204,0.06), transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
        animation: "orb-float-a 22s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "25%", width: 600, height: 600,
        marginLeft: -300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,92,252,0.05), transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none",
        animation: "orb-float-b 26s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
        {/* Badge */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 16px", borderRadius: 100,
            background: "rgba(0,229,204,0.05)", border: "1px solid rgba(0,229,204,0.1)",
            fontSize: 12, color: COLORS.accent, fontWeight: 600,
            animation: "fade-in-up 0.5s ease both",
          }}>
            <Terminal size={13} /> The Command Center
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(34px, 5.5vw, 62px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.035em",
            lineHeight: 1.06,
            textAlign: "center",
            marginBottom: 20,
            animation: "fade-in-up 0.5s ease 0.05s both",
          }}
        >
          Your Portfolio.<br />
          <span
            style={{
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            On Autopilot.
          </span>
        </h1>

        <p style={{
          fontSize: 17, color: COLORS.textSecondary, lineHeight: 1.8,
          maxWidth: 540, margin: "0 auto 64px", textAlign: "center",
          animation: "fade-in-up 0.5s ease 0.1s both",
        }}>
          Take the emotion out of trading. Configure your risk limits, select your markets, and let our deterministic engine execute your strategy 24/7.
        </p>

        {/* ─── Terminal Configuration Dashboard ─── */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(160deg, rgba(8,14,32,0.95), rgba(4,8,20,0.98))",
            border: "1px solid rgba(0,229,204,0.08)",
            boxShadow: "0 48px 120px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,229,204,0.04), inset 0 1px 0 rgba(255,255,255,0.03)",
            animation: "fade-in-up 0.6s ease 0.15s both",
          }}
        >
          {/* ─ Window chrome ─ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: COLORS.textSecondary, letterSpacing: "0.08em" }}>
              POLYWHALE &mdash; BOT CONFIGURATION
            </span>
            <Settings size={14} color={COLORS.textSecondary} />
          </div>

          {/* ─ Dashboard body: 2-column split ─ */}
          <div
            className="dash-halves"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* ══ LEFT PANEL: Slider + Categories ══ */}
            <div style={{ padding: "32px 30px", background: "rgba(6,10,24,0.6)" }}>

              {/* ─ Max Position Size Slider ─ */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <span className="font-mono" style={{ fontSize: 10, color: COLORS.textSecondary, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Max Position Size
                  </span>
                  <span className="font-mono" style={{ fontSize: 18, color: COLORS.accent, fontWeight: 700, letterSpacing: "-0.02em" }}>
                    ${maxSize.toLocaleString()}
                    <span style={{ fontSize: 10, color: COLORS.textSecondary, fontWeight: 500, marginLeft: 4 }}>USDC</span>
                  </span>
                </div>

                {/* Native range input with CSS gradient track */}
                <div style={{ position: "relative", paddingBottom: 2 }}>
                  <input
                    type="range"
                    className="pw-slider"
                    min={0}
                    max={5000}
                    step={50}
                    value={maxSize}
                    onChange={(e) => setMaxSize(Number(e.target.value))}
                    style={{
                      background: `linear-gradient(90deg, #00e5cc ${fillPct}%, #7c5cfc ${fillPct}%, rgba(255,255,255,0.04) ${fillPct}%)`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>$0</span>
                  <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.15)" }}>$5,000</span>
                </div>
              </div>

              {/* ─ Market Categories Toggle Grid ─ */}
              <span className="font-mono" style={{
                fontSize: 10, color: COLORS.textSecondary,
                letterSpacing: "0.1em", textTransform: "uppercase",
                display: "block", marginBottom: 14,
              }}>
                Market Categories
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {categories.map(({ label, icon }) => {
                  const active = selectedCats.includes(label);
                  return (
                    <button
                      key={label}
                      onClick={() => toggleCat(label)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1px solid ${active ? "rgba(0,229,204,0.28)" : "rgba(255,255,255,0.05)"}`,
                        background: active ? "rgba(0,229,204,0.10)" : "rgba(255,255,255,0.015)",
                        color: active ? COLORS.accent : COLORS.textSecondary,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "all 0.2s ease",
                        boxShadow: active ? "0 0 16px rgba(0,229,204,0.08), inset 0 1px 0 rgba(0,229,204,0.06)" : "none",
                        filter: active ? "drop-shadow(0 0 6px rgba(0,229,204,0.25))" : "none",
                      }}
                    >
                      <span style={{
                        display: "flex",
                        color: active ? COLORS.accent : "rgba(255,255,255,0.2)",
                        transition: "color 0.2s",
                        flexShrink: 0,
                      }}>
                        {icon}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ══ RIGHT PANEL: Risk Profile ══ */}
            <div style={{ padding: "32px 30px", background: "rgba(6,10,24,0.6)" }}>
              <span className="font-mono" style={{
                fontSize: 10, color: COLORS.textSecondary,
                letterSpacing: "0.1em", textTransform: "uppercase",
                display: "block", marginBottom: 16,
              }}>
                Risk Profile
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {risks.map((rp) => {
                  const active = riskProfile === rp.label;
                  return (
                    <button
                      key={rp.label}
                      onClick={() => setRiskProfile(rp.label)}
                      style={{
                        padding: "18px 20px",
                        borderRadius: 14,
                        cursor: "pointer",
                        border: `1px solid ${active ? `${rp.color}45` : "rgba(255,255,255,0.03)"}`,
                        background: active ? `${rp.color}0f` : "rgba(255,255,255,0.01)",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                        fontFamily: "'DM Sans', sans-serif",
                        transform: active ? "translateX(4px)" : "translateX(0)",
                        boxShadow: active
                          ? `0 0 28px ${rp.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`
                          : "none",
                      }}
                    >
                      {/* Radio dot */}
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${active ? rp.color : "rgba(255,255,255,0.1)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                        boxShadow: active ? `0 0 12px ${rp.color}50` : "none",
                      }}>
                        {active && (
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: rp.color,
                            boxShadow: `0 0 10px ${rp.color}80`,
                          }} />
                        )}
                      </div>

                      {/* Labels */}
                      <div style={{ textAlign: "left", flex: 1 }}>
                        <div style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: active ? "#fff" : COLORS.textSecondary,
                          marginBottom: 3,
                          letterSpacing: "-0.01em",
                        }}>
                          {rp.label}
                        </div>
                        <div style={{
                          fontSize: 11,
                          color: active ? rp.color : "rgba(255,255,255,0.18)",
                          transition: "color 0.2s",
                        }}>
                          {rp.desc}
                        </div>
                      </div>

                      {/* Active accent bar on right */}
                      {active && (
                        <div style={{
                          width: 3,
                          height: 32,
                          borderRadius: 2,
                          background: `linear-gradient(180deg, ${rp.color}, ${rp.color}40)`,
                          boxShadow: `0 0 10px ${rp.color}50`,
                          flexShrink: 0,
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bot status bar */}
              <div style={{
                marginTop: 28, padding: "14px 18px", borderRadius: 12,
                background: "rgba(0,229,204,0.03)", border: "1px solid rgba(0,229,204,0.08)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: COLORS.accent,
                  boxShadow: `0 0 10px ${COLORS.accent}50`,
                  animation: "live-dot 2s ease-in-out infinite",
                }} />
                <span className="font-mono" style={{ fontSize: 10, color: COLORS.accent, fontWeight: 600, letterSpacing: "0.04em" }}>
                  BOT STATUS: ACTIVE &mdash; MONITORING 1,247 WALLETS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════
   CORE FEATURES — 3-Column Grid
   with interactive data visuals
   ═══════════════════════════════════════ */
function CoreFeatures(): React.JSX.Element {
  const ref = useReveal(0.1);

  return (
    <section style={{ padding: "60px 24px 140px" }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1060, margin: "0 auto" }}>
        <SectionLabel num="01" text="Core Engine" color={COLORS.accent} />

        <h2 className="font-display" style={{
          fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, color: "#fff",
          letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.1,
        }}>
          Built for{" "}
          <span style={{ color: COLORS.accentAlt }}>Precision</span>,{" "}
          Not Gambling
        </h2>
        <p style={{
          fontSize: 15, lineHeight: 1.8, color: COLORS.textSecondary,
          maxWidth: 520, marginBottom: 56,
        }}>
          Every component is engineered to minimize risk and maximize the
          probability of profitable execution. No guesswork. No emotion. Pure signal.
        </p>

        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <RebalanceCard />
          <SlippageCard />
          <ConvictionCard />
        </div>
      </div>
    </section>
  );
}

/* ── Card wrapper with shared hover behavior ── */
/* ── Card wrapper — render-prop pattern so children can read hovered state ── */
function FeatureCard({
  children,
  color,
}: {
  children: (hovered: boolean) => React.ReactNode;
  color: string;
}): React.JSX.Element {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        borderRadius: 18,
        background: hovered ? `${color}05` : "rgba(6,10,24,0.85)",
        border: `1px solid ${hovered ? `rgba(0,229,204,0.22)` : "rgba(255,255,255,0.04)"}`,
        boxShadow: hovered
          ? `0 0 48px rgba(0,229,204,0.07), 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
          : "inset 0 1px 0 rgba(255,255,255,0.02)",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {children(hovered)}
    </div>
  );
}

/* ── Shared glassmorphism icon container ── */
function CardIcon({
  icon,
  color,
  hovered,
}: {
  icon: React.ReactNode;
  color: string;
  hovered: boolean;
}): React.JSX.Element {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: hovered
          ? `rgba(${color === COLORS.accent ? "0,229,204" : color === COLORS.accentAlt ? "124,92,252" : "244,114,182"},0.14)`
          : `rgba(${color === COLORS.accent ? "0,229,204" : color === COLORS.accentAlt ? "124,92,252" : "244,114,182"},0.07)`,
        border: `1px solid ${hovered ? `${color}40` : `${color}18`}`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: hovered ? `0 0 24px ${color}30, inset 0 1px 0 rgba(255,255,255,0.08)` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        marginBottom: 22,
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}

/* ── 1. Auto-Rebalancing ── */
function RebalanceCard(): React.JSX.Element {
  const allocsIdle    = [
    { label: "Politics", pct: 42, color: COLORS.accent },
    { label: "Crypto",   pct: 28, color: COLORS.accentAlt },
    { label: "Sports",   pct: 18, color: COLORS.accentPink },
    { label: "Other",    pct: 12, color: "#fbbf24" },
  ];
  const allocsHovered = [
    { label: "Politics", pct: 35, color: COLORS.accent },
    { label: "Crypto",   pct: 35, color: COLORS.accentAlt },
    { label: "Sports",   pct: 20, color: COLORS.accentPink },
    { label: "Other",    pct: 10, color: "#fbbf24" },
  ];

  return (
    <FeatureCard color={COLORS.accent}>
      {(hovered) => {
        const allocs = hovered ? allocsHovered : allocsIdle;
        return (
          <>
            <CardIcon icon={<RefreshCw size={20} />} color={COLORS.accent} hovered={hovered} />

            <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
              Auto-Rebalancing
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: COLORS.textSecondary, marginBottom: 22 }}>
              Dynamically reallocates your portfolio across market categories
              based on whale activity concentration and your risk limits.
            </p>

            {/* Animated stacked allocation bar */}
            <div style={{ borderRadius: 6, overflow: "hidden", height: 8, display: "flex", marginBottom: 12 }}>
              {allocs.map((a, i) => (
                <div
                  key={i}
                  style={{
                    width: `${a.pct}%`,
                    height: "100%",
                    background: a.color,
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {allocs.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 2, background: a.color, transition: "background 0.3s" }} />
                  <span className="font-mono" style={{ fontSize: 9, color: COLORS.textSecondary, transition: "color 0.3s" }}>
                    {a.label} {a.pct}%
                  </span>
                </div>
              ))}
            </div>
          </>
        );
      }}
    </FeatureCard>
  );
}

/* ── 2. Slippage Protection — interactive order book ── */
function SlippageCard(): React.JSX.Element {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const book = [
    { price: "0.67", size: "2,400", side: "ask", blocked: true },
    { price: "0.65", size: "1,800", side: "ask", blocked: true },
    { price: "0.63", size: "3,100", side: "ask", blocked: false },
    { price: "0.61", size: "5,200", side: "bid", blocked: false },
    { price: "0.59", size: "4,600", side: "bid", blocked: false },
  ];

  return (
    <FeatureCard color={COLORS.accentPink}>
      {(hovered) => (
        <>
          <CardIcon icon={<ShieldAlert size={20} />} color={COLORS.accentPink} hovered={hovered} />

          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
            Slippage Protection
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: COLORS.textSecondary, marginBottom: 22 }}>
            Orders exceeding your slippage threshold are automatically blocked
            before execution. Hard ceiling at 1%.
          </p>

          {/* Interactive order book */}
          <div style={{
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(0,0,0,0.3)",
          }}>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              padding: "8px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(255,255,255,0.015)",
            }}>
              {["Price", "Size", "Status"].map((h) => (
                <span key={h} className="font-mono" style={{
                  fontSize: 8, color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {book.map((o, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center",
                  padding: "7px 14px",
                  background: hoveredRow === i
                    ? "rgba(255,255,255,0.04)"
                    : o.blocked
                      ? "rgba(255,59,59,0.03)"
                      : "transparent",
                  borderBottom: i < book.length - 1 ? "1px solid rgba(255,255,255,0.025)" : "none",
                  transition: "background 0.15s ease",
                  cursor: "default",
                }}
              >
                <span className="font-mono" style={{
                  fontSize: 11, fontWeight: 600,
                  color: o.side === "ask" ? "#ff6b6b" : COLORS.accent,
                  opacity: o.blocked ? 0.45 : 1,
                }}>
                  {o.price}
                </span>
                <span className="font-mono" style={{
                  fontSize: 11,
                  color: COLORS.textSecondary,
                  opacity: o.blocked ? 0.35 : 1,
                }}>
                  {o.size}
                </span>
                {o.blocked ? (
                  <span className="font-mono" style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.07em",
                    color: "#ff3b3b",
                    background: "rgba(255,59,59,0.10)",
                    border: "1px solid rgba(255,59,59,0.20)",
                    padding: "2px 7px", borderRadius: 4,
                    display: "inline-block", width: "fit-content",
                  }}>
                    BLOCKED
                  </span>
                ) : (
                  <span className="font-mono" style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.07em",
                    color: COLORS.accent,
                    background: "rgba(0,229,204,0.08)",
                    border: "1px solid rgba(0,229,204,0.18)",
                    padding: "2px 7px", borderRadius: 4,
                    display: "inline-block", width: "fit-content",
                  }}>
                    OK
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </FeatureCard>
  );
}

/* ── 3. Smart Conviction Scoring — live threshold ── */
function ConvictionCard(): React.JSX.Element {
  const confidence = 94;

  return (
    <FeatureCard color={COLORS.accentAlt}>
      {(hovered) => (
        <>
          <CardIcon icon={<BrainCircuit size={20} />} color={COLORS.accentAlt} hovered={hovered} />

          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>
            Smart Conviction Scoring
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: COLORS.textSecondary, marginBottom: 22 }}>
            Each whale move is scored against historical accuracy, position size,
            and market context before any capital is deployed.
          </p>

          {/* Conviction threshold meter */}
          <div style={{
            padding: "16px 18px", borderRadius: 12,
            background: "rgba(0,0,0,0.28)", border: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <span className="font-mono" style={{ fontSize: 10, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Whale Confidence
              </span>
              <span className="font-mono" style={{
                fontSize: 16, fontWeight: 700, color: COLORS.accent, letterSpacing: "-0.02em",
                transition: "opacity 0.4s ease",
                opacity: hovered ? 1 : 0.5,
              }}>
                {hovered ? `${confidence}%` : "—"}
              </span>
            </div>

            {/* Animated meter bar — fills on hover */}
            <div style={{
              position: "relative", height: 7, borderRadius: 4,
              background: "rgba(255,255,255,0.04)",
              overflow: "visible", marginBottom: 12,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                width: hovered ? `${confidence}%` : "0%",
                borderRadius: 4,
                background: `linear-gradient(90deg, ${COLORS.accentAlt}, ${COLORS.accent})`,
                boxShadow: hovered ? "0 0 16px rgba(0,229,204,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
                transition: "width 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
              }} />
              {/* 70% threshold marker */}
              <div style={{
                position: "absolute", top: -4, left: "70%",
                width: 1.5, height: 15,
                background: "rgba(255,255,255,0.18)", borderRadius: 1,
              }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="font-mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                Threshold: 70%
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: 10, fontWeight: 700,
                  color: "#060b18",
                  background: COLORS.accent,
                  padding: "3px 10px", borderRadius: 4,
                  letterSpacing: "0.05em",
                  display: "inline-block",
                  animation: "execute-pulse 2s ease-in-out infinite",
                  transformOrigin: "center",
                }}
              >
                EXECUTE
              </span>
            </div>
          </div>
        </>
      )}
    </FeatureCard>
  );
}


/* ═══════════════════════════════════════
   LIVE MIRRORING FEED
   Terminal-style execution log
   ═══════════════════════════════════════ */
function LiveFeed(): React.JSX.Element {
  const ref = useReveal(0.1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const trades = [
    {
      whale: "0x4B\u202622\u2026a1", action: "BUY YES", market: "Fed Rate Cut July",
      algo: "SCALING TO 5.2% PORTFOLIO", status: "CONFIRMED", time: "0.3s ago",
    },
    {
      whale: "0x7F\u202618\u2026c3", action: "BUY NO", market: "BTC > $100k EOY",
      algo: "SCALING TO 3.8% PORTFOLIO", status: "CONFIRMED", time: "1.2s ago",
    },
    {
      whale: "0xA3\u202641\u2026f9", action: "BUY YES", market: "Trump Wins 2028",
      algo: "SCALING TO 7.1% PORTFOLIO", status: "CONFIRMED", time: "4.7s ago",
    },
    {
      whale: "0x1D\u202655\u2026b2", action: "SELL YES", market: "ETH Flippens BTC",
      algo: "REDUCING TO 0% \u2014 EXIT POSITION", status: "CONFIRMED", time: "8.1s ago",
    },
    {
      whale: "0x9C\u202633\u2026e7", action: "BUY YES", market: "S&P 500 > 6000",
      algo: "SCALING TO 4.5% PORTFOLIO", status: "PENDING", time: "now",
    },
  ];

  /* Semantic action color: BUY YES = cyan, everything else = red */
  const actionColor = (action: string): string =>
    action === "BUY YES" ? COLORS.accent : "#ff3b3b";

  return (
    <section style={{ padding: "0 24px 160px" }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1060, margin: "0 auto" }}>
        <SectionLabel num="02" text="Live Mirroring Feed" color={COLORS.accentPink} />

        <h2 className="font-display" style={{
          fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, color: "#fff",
          letterSpacing: "-0.03em", marginBottom: 18, lineHeight: 1.1,
        }}>
          Watch the Algorithm{" "}
          <span style={{ color: COLORS.accentPink }}>Work</span>
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.textSecondary, maxWidth: 520, marginBottom: 48 }}>
          Real-time execution feed. Every whale signal detected, scored, and
          mirrored in under 20 milliseconds.
        </p>

        {/* ─── Terminal container ─── */}
        <div style={{
          borderRadius: 18, overflow: "hidden",
          background: "rgba(3,6,16,0.96)",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02)",
        }}>
          {/* Terminal chrome */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "13px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(0,0,0,0.25)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%", background: COLORS.accent,
                boxShadow: `0 0 10px ${COLORS.accent}50`,
                animation: "live-dot 2s ease-in-out infinite",
              }} />
              <span className="font-mono" style={{ fontSize: 10, color: COLORS.textSecondary, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Execution Log
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Activity size={12} color={COLORS.accent} />
              <span className="font-mono" style={{ fontSize: 10, color: COLORS.accent, fontWeight: 600 }}>LIVE</span>
            </div>
          </div>

          {/* Feed rows */}
          <div style={{ padding: "6px 0" }}>
            {trades.map((t, i) => {
              const isConfirmed = t.status === "CONFIRMED";
              const isHovered   = hoveredRow === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    padding: "16px 28px",
                    paddingLeft: isHovered ? "26px" : "28px",   /* compensates for 2px border */
                    borderBottom: i < trades.length - 1 ? "1px solid rgba(255,255,255,0.02)" : "none",
                    borderLeft: isHovered ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                    background: isHovered ? "rgba(255,255,255,0.02)" : "transparent",
                    /* staggered cascade entrance */
                    animation: `feed-row-in 0.45s ease ${i * 0.1}s both`,
                    transition: "background 0.2s ease, border-left-color 0.2s ease",
                    cursor: "default",
                  }}
                >
                  <div className="font-mono" style={{ fontSize: 12, lineHeight: 2, color: COLORS.textSecondary }}>

                    {/* Line 1: Whale signal */}
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>[</span>
                    <span style={{ color: COLORS.textSecondary }}>WHALE: </span>
                    <span style={{ color: "#fbbf24" }}>{t.whale}</span>
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>]</span>
                    {" "}
                    {/* Semantic action color: BUY YES = cyan, BUY NO / SELL = red */}
                    <span style={{ color: actionColor(t.action), fontWeight: 700 }}>{t.action}</span>
                    {" "}
                    {/* Market name: bright white for maximum scannability */}
                    <span style={{ color: "#ffffff", fontWeight: 600 }}>&ldquo;{t.market}&rdquo;</span>
                    <br />

                    {/* Line 2: Algo action */}
                    <span style={{ color: "rgba(255,255,255,0.08)" }}>&nbsp;&nbsp;&rarr; </span>
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>[</span>
                    <span style={{ color: COLORS.accentAlt }}>POLYWHALE ALGO</span>
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>]</span>
                    {" "}
                    <span style={{ color: COLORS.textPrimary }}>{t.algo}</span>
                    <br />

                    {/* Line 3: Status badge */}
                    <span style={{ color: "rgba(255,255,255,0.08)" }}>&nbsp;&nbsp;&rarr; </span>
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>[</span>
                    <span style={{ color: COLORS.textSecondary }}>STATUS</span>
                    <span style={{ color: "rgba(255,255,255,0.12)" }}>]</span>
                    {" "}
                    <span style={{
                      display: "inline-block",
                      padding: "2px 10px", borderRadius: 4,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                      background: isConfirmed ? "rgba(0,229,204,0.1)" : "rgba(255,59,59,0.08)",
                      color: isConfirmed ? COLORS.accent : "#fbbf24",
                      border: `1px solid ${isConfirmed ? "rgba(0,229,204,0.18)" : "rgba(251,191,36,0.2)"}`,
                      /* CONFIRMED: static cyan glow; PENDING: breathing opacity pulse */
                      animation: isConfirmed
                        ? "status-glow 2.5s ease-in-out infinite"
                        : "pending-pulse 1.4s ease-in-out infinite",
                    }}>
                      {isConfirmed ? "CONFIRMED ON-CHAIN" : "PENDING\u2026"}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 10, marginLeft: 10 }}>{t.time}</span>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════ */
function FinalCTA(): React.JSX.Element {
  const ref = useReveal(0.1);

  return (
    <section style={{ padding: "0 24px 140px" }}>
      <div ref={ref} className="reveal" style={{
        maxWidth: 860, margin: "0 auto", padding: "64px 48px",
        borderRadius: 24, position: "relative", overflow: "hidden",
        background: "linear-gradient(145deg, rgba(0,229,204,0.035), rgba(124,92,252,0.045))",
        border: "1px solid rgba(255,255,255,0.04)", textAlign: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "-35%", right: "-12%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,204,0.06), transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 100,
            background: "rgba(124,92,252,0.06)", border: "1px solid rgba(124,92,252,0.1)",
            marginBottom: 32, fontSize: 12, color: COLORS.accentAlt, fontWeight: 600,
          }}>
            <Crown size={13} /> Deploy Your Edge
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff",
            marginBottom: 20, letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            Ready to{" "}
            <span style={{
              background: "linear-gradient(135deg, #00e5cc, #7c5cfc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Automate Alpha</span>?
          </h2>

          <p style={{
            fontSize: 16, color: COLORS.textSecondary, maxWidth: 460,
            margin: "0 auto 44px", lineHeight: 1.8,
          }}>
            Configure your bot in under 60 seconds. Connect your Polymarket
            API key, set your parameters, and start mirroring whale moves instantly.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/pricing"
              className="btn-shimmer font-display"
              style={{
                padding: "16px 36px", borderRadius: 14, border: "none", cursor: "pointer",
                color: "#060b18", fontWeight: 700, fontSize: 16,
                display: "inline-flex", alignItems: "center", gap: 10,
                textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(-2px) scale(1.02)";
                t.style.boxShadow = "0 10px 36px rgba(0,229,204,0.35)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.transform = "translateY(0) scale(1)";
                t.style.boxShadow = "none";
              }}
            >
              Get Started <ArrowRight size={16} />
            </a>

            <a
              href="/how-it-works"
              className="font-display"
              style={{
                padding: "16px 28px", borderRadius: 14, cursor: "pointer",
                background: "rgba(124,92,252,0.04)", border: "1px solid rgba(124,92,252,0.12)",
                color: COLORS.accentAlt, fontWeight: 600, fontSize: 15,
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.background = "rgba(124,92,252,0.1)";
                t.style.borderColor = "rgba(124,92,252,0.25)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.background = "rgba(124,92,252,0.04)";
                t.style.borderColor = "rgba(124,92,252,0.12)";
              }}
            >
              How It Works <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════ */
export default function TheBotPage(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [modalOpen, setModalOpen]       = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(() => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("pw_user_email");
});

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <GlobalStyles />

      {/* Background effects */}
      <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "5%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.05), transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "5%", right: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,204,0.04), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <Header
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        onOpenModal={() => setModalOpen(true)}
        userEmail={userEmail}
        onSignOut={() => setUserEmail(null)}
      />

      <main style={{ position: "relative" }}>
        <HeroSection />
        <CoreFeatures />
        <LiveFeed />
        <FinalCTA />

        {/* Footer */}
        <footer style={{ borderTop: "1px solid rgba(0,229,204,0.06)", padding: "36px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: COLORS.textSecondary }}>
              &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
            </span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Terms", "Privacy", "Risk Disclosure"].map((s, i) => (
                <a key={i} href="#" style={{ fontSize: 12, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                  {s}
                </a>
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