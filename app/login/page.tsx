"use client";

import React, { useState, useEffect } from "react";
import { Waves, Eye, EyeOff, User, Shield, ArrowRight, Zap } from "lucide-react";

/* ─── palette — matches site-wide tokens ─── */
const COLORS = {
  bg:            "#060b18",
  accent:        "#00e5cc",
  accentAlt:     "#7c5cfc",
  textPrimary:   "#e2e8f0",
  textSecondary: "#8492a6",
};

/* ═══════════════════════════════════════
   MAIN LOGIN PAGE
   ═══════════════════════════════════════ */
export default function LoginPage(): React.JSX.Element {
  const [email, setEmail]         = useState<string>("");
  const [password, setPassword]   = useState<string>("");
  const [showPass, setShowPass]   = useState<boolean>(false);
  const [focused, setFocused]     = useState<string | null>(null);
  const [loading, setLoading]     = useState<boolean>(false);
  const [error, setError]         = useState<string | null>(null);
  const [fieldErrs, setFieldErrs] = useState<{ email?: string; password?: string }>({});

  /* Redirect if already logged in */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pw_user_email");
      if (stored) window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";
    if (!password)
      errs.password = "Please enter your password.";
    if (Object.keys(errs).length) { setFieldErrs(errs); return; }

    setFieldErrs({});
    setError(null);
    setLoading(true);

    try {
      const res  = await fetch("/api/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Invalid email or password.");
      } else {
        localStorage.setItem("pw_user_email", email);
        window.location.href = "/";
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string, hasErr: boolean): React.CSSProperties => ({
    width:       "100%",
    background:  "rgba(255,255,255,0.04)",
    border:      `1px solid ${hasErr ? "rgba(239,68,68,0.6)" : focused === field ? "rgba(0,229,204,0.5)" : "rgba(255,255,255,0.08)"}`,
    boxShadow:   focused === field && !hasErr ? "0 0 0 3px rgba(0,229,204,0.08)" : "none",
    borderRadius: 10,
    padding:     "13px 16px",
    color:       COLORS.textPrimary,
    fontFamily:  "DM Sans, sans-serif",
    fontSize:    15,
    outline:     "none",
    transition:  "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body, html {
          background: ${COLORS.bg};
          color: ${COLORS.textPrimary};
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .font-display { font-family: 'Syne', sans-serif; }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .btn-shimmer {
          background: linear-gradient(110deg, #00e5cc 0%, #00e5cc 40%, #7dfff0 50%, #00e5cc 60%, #00e5cc 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes grid-drift {
          0%   { transform: translate(0, 0);     }
          100% { transform: translate(40px, 40px); }
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: grid-drift 20s linear infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .card-enter { animation: fade-in-up 0.55s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes orb-a {
          0%, 100% { transform: translate(0, 0)   scale(1);    }
          50%      { transform: translate(40px, -30px) scale(1.06); }
        }
        @keyframes orb-b {
          0%, 100% { transform: translate(0, 0)    scale(1);    }
          50%      { transform: translate(-35px, 25px) scale(0.95); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: COLORS.bg, position: "relative", display: "flex", flexDirection: "column" }}>

        {/* ── Animated grid background ── */}
        <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

        {/* ── Floating orbs ── */}
        <div style={{ position: "fixed", top: "10%", left: "8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.09), transparent 70%)", filter: "blur(70px)", pointerEvents: "none", animation: "orb-a 18s ease-in-out infinite" }} />
        <div style={{ position: "fixed", bottom: "8%", right: "6%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,204,0.07), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", animation: "orb-b 22s ease-in-out infinite" }} />

        {/* ── Top nav bar ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "16px 24px",
          background: "rgba(6,11,24,0.7)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,229,204,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #00e5cc, #7c5cfc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Waves size={18} color="#060b18" strokeWidth={2.5} />
            </div>
            <span className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
              Poly<span style={{ color: COLORS.accent }}>Whale</span>
            </span>
          </a>
          <a href="/signup" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
            Don&apos;t have an account? <span style={{ color: COLORS.accent, fontWeight: 700 }}>Sign up →</span>
          </a>
        </nav>

        {/* ── Main content ── */}
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 48px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "100%", maxWidth: 920, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

            {/* ── Left: brand copy ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Live badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.14)", width: "fit-content", fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accent, boxShadow: "0 0 8px #00e5cc", display: "inline-block" }} />
                <Zap size={11} /> Markets live — resume your edge
              </div>

              <h1 className="font-display" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff" }}>
                Welcome<br />
                <span style={{ background: "linear-gradient(135deg, #00e5cc, #7c5cfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  back.
                </span>
              </h1>

              <p style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.textSecondary, maxWidth: 340 }}>
                Your whale watchlist, active positions, and bot configuration are waiting. Sign in to pick up where you left off.
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 28, paddingTop: 8 }}>
                {[
                  { val: "$48M+",  label: "Volume Tracked"  },
                  { val: "1,200+", label: "Whales Indexed"  },
                  { val: "<20ms",  label: "Avg. Latency"    },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-display" style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{val}</div>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 3, letterSpacing: "0.02em" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div style={{ opacity: 0.3, marginTop: 4 }}>
                <svg width="100%" height="52" viewBox="0 0 320 52" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                      <stop stopColor="#00e5cc" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#00e5cc" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 40 L40 30 L80 34 L120 16 L160 22 L200 8 L240 14 L280 4 L320 8 L320 52 L0 52Z" fill="url(#lg)" />
                  <path d="M0 40 L40 30 L80 34 L120 16 L160 22 L200 8 L240 14 L280 4 L320 8" stroke="#00e5cc" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* ── Right: login card ── */}
            <div className="card-enter" style={{
              background: "rgba(10,16,36,0.85)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "40px 36px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,229,204,0.05), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              {/* Top shimmer line */}
              <div style={{ position: "absolute", top: 0, left: "-50%", right: "-50%", height: 1, background: "linear-gradient(90deg, transparent, #00e5cc, #7c5cfc, transparent)", opacity: 0.55 }} />

              {/* Card heading */}
              <div style={{ marginBottom: 28 }}>
                <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                  Sign in to PolyWhale
                </h2>
                <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  Enter your credentials to access your dashboard.
                </p>
              </div>

              {/* Global error */}
              {error && (
                <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <Shield size={14} color="#ef4444" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#ef4444", lineHeight: 1.5 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Email */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, color: focused === "email" ? COLORS.accent : COLORS.textSecondary, transition: "color 0.2s" }}>
                    Email address
                  </label>
                  <input
                    type="email" value={email} required autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    style={inputStyle("email", !!fieldErrs.email)}
                  />
                  {fieldErrs.email && <p style={{ marginTop: 5, fontSize: 12, color: "#ef4444" }}>{fieldErrs.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: focused === "password" ? COLORS.accent : COLORS.textSecondary, transition: "color 0.2s" }}>
                      Password
                    </label>
                    <a href="#" style={{ fontSize: 12, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                      Forgot password?
                    </a>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPass ? "text" : "password"} value={password} required autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your password"
                      style={{ ...inputStyle("password", !!fieldErrs.password), paddingRight: 44 }}
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: COLORS.textSecondary, display: "flex", alignItems: "center" }}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {fieldErrs.password && <p style={{ marginTop: 5, fontSize: 12, color: "#ef4444" }}>{fieldErrs.password}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className={loading ? "" : "btn-shimmer font-display"}
                  style={{
                    marginTop: 4, width: "100%", padding: "14px", borderRadius: 12, border: "none",
                    background: loading ? "rgba(0,229,204,0.2)" : undefined,
                    color: loading ? "rgba(255,255,255,0.45)" : "#060b18",
                    fontWeight: 700, fontSize: 16, fontFamily: "Syne, sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!loading) { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(-1px)"; t.style.boxShadow = "0 8px 28px rgba(0,229,204,0.4)"; } }}
                  onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}
                >
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <><User size={16} /> Sign In <ArrowRight size={14} /></>
                  )}
                </button>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  <span style={{ fontSize: 11, color: "rgba(130,146,166,0.5)", letterSpacing: "0.08em" }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                </div>

                {/* Create account link */}
                <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textSecondary }}>
                  New to PolyWhale?{" "}
                  <a href="/" style={{ color: COLORS.accent, textDecoration: "none", fontWeight: 700 }}
                    onClick={(e) => {
                      e.preventDefault();
                      // Go home and trigger the signup modal via hash
                      window.location.href = "/#signup";
                    }}>
                    Create a free account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(0,229,204,0.06)", padding: "20px 24px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(130,146,166,0.4)" }}>
            &copy; 2026 PolyWhale. Prediction markets involve risk.
          </span>
        </footer>
      </div>
    </>
  );
}