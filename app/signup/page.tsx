"use client";

import React, { useState } from "react";
import { Waves, Eye, EyeOff, User, Shield, ArrowRight, CheckCircle } from "lucide-react";

const COLORS = {
  bg:            "#060b18",
  accent:        "#00e5cc",
  accentAlt:     "#7c5cfc",
  textPrimary:   "#e2e8f0",
  textSecondary: "#8492a6",
};

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)                    score++;
  if (pw.length >= 12)                   score++;
  if (/[A-Z]/.test(pw))                  score++;
  if (/[0-9]/.test(pw))                  score++;
  if (/[^A-Za-z0-9]/.test(pw))           score++;
  const levels = [
    { label: "",          color: "transparent" },
    { label: "Weak",      color: "#ef4444" },
    { label: "Fair",      color: "#f97316" },
    { label: "Good",      color: "#eab308" },
    { label: "Strong",    color: "#22c55e" },
    { label: "Excellent", color: COLORS.accent },
  ];
  return { score, ...levels[score] };
}

export default function SignupPage(): React.JSX.Element {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused]   = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);
  const [fieldErrs, setFieldErrs] = useState<{ email?: string; password?: string }>({});

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";
    if (!password || password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (Object.keys(errs).length) { setFieldErrs(errs); return; }

    setFieldErrs({});
    setError(null);
    setLoading(true);

    try {
      const res  = await fetch("/api/signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Something went wrong. Please try again.");
      } else {
        localStorage.setItem("pw_user_email", email);
        setSuccess(true);
        setTimeout(() => { window.location.href = "/pricing"; }, 1800);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string, hasErr: boolean): React.CSSProperties => ({
    width:        "100%",
    background:   "rgba(255,255,255,0.04)",
    border:       `1px solid ${hasErr ? "rgba(239,68,68,0.6)" : focused === field ? "rgba(0,229,204,0.5)" : "rgba(255,255,255,0.08)"}`,
    boxShadow:    focused === field && !hasErr ? "0 0 0 3px rgba(0,229,204,0.08)" : "none",
    borderRadius: 10,
    padding:      "13px 16px",
    color:        COLORS.textPrimary,
    fontFamily:   "DM Sans, sans-serif",
    fontSize:     15,
    outline:      "none",
    transition:   "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { background: ${COLORS.bg}; color: ${COLORS.textPrimary}; font-family: 'DM Sans', sans-serif; min-height: 100vh; overflow-x: hidden; }
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .btn-shimmer { background: linear-gradient(110deg, #00e5cc 0%, #00e5cc 40%, #7dfff0 50%, #00e5cc 60%, #00e5cc 100%); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite; }
        @keyframes grid-drift { 0% { transform: translate(0,0); } 100% { transform: translate(40px,40px); } }
        .grid-bg { background-image: linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px); background-size: 60px 60px; animation: grid-drift 20s linear infinite; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .card-enter { animation: fade-in-up 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes orb-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.06); } }
        @keyframes orb-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-35px,25px) scale(0.95); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pop-in { 0% { opacity:0; transform: scale(0.85); } 100% { opacity:1; transform: scale(1); } }
        .pop-in { animation: pop-in 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: COLORS.bg, position: "relative", display: "flex", flexDirection: "column" }}>

        <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
        <div style={{ position: "fixed", top: "10%", right: "8%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.09), transparent 70%)", filter: "blur(70px)", pointerEvents: "none", animation: "orb-a 18s ease-in-out infinite" }} />
        <div style={{ position: "fixed", bottom: "8%", left: "6%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,204,0.07), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", animation: "orb-b 22s ease-in-out infinite" }} />

        {/* Nav */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 24px", background: "rgba(6,11,24,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,229,204,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Waves size={22} color="#00e5cc" />
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
              Poly<span style={{ color: COLORS.accent }}>Whale</span>
            </span>
          </a>
          <a href="/login" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
            Already have an account? <span style={{ color: COLORS.accent, fontWeight: 700 }}>Sign in →</span>
          </a>
        </nav>

        <main style={{ flex: 1, position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" }}>
          <div style={{ width: "100%", maxWidth: 900, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

            {/* Left: copy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.14)", width: "fit-content", fontSize: 12, color: COLORS.accent, fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accent, boxShadow: "0 0 8px #00e5cc", display: "inline-block" }} />
                  Free to start
                </div>
                <h1 className="font-display" style={{ marginTop: 16, fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  Start copying<br />
                  <span style={{ background: "linear-gradient(90deg, #00e5cc, #7c5cfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    elite whales.
                  </span>
                </h1>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.textSecondary, maxWidth: 340, marginTop: 12 }}>
                  Create your free account and get instant access to the Whale Index. Upgrade anytime to mirror positions automatically.
                </p>
              </div>

              {/* Feature bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Browse the top 50 Polymarket traders",
                  "See win rates, PnL, and volume",
                  "Upgrade to auto-follow any whale",
                ].map((text) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,229,204,0.1)", border: "1px solid rgba(0,229,204,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#00e5cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontSize: 14, color: COLORS.textSecondary }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: signup card */}
            <div className="card-enter" style={{ background: "rgba(10,16,36,0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px 36px", position: "relative", overflow: "hidden", boxShadow: "0 0 0 1px rgba(0,229,204,0.05), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div style={{ position: "absolute", top: 0, left: "-50%", right: "-50%", height: 1, background: "linear-gradient(90deg, transparent, #00e5cc, #7c5cfc, transparent)", opacity: 0.55 }} />

              {/* Success state */}
              {success ? (
                <div className="pop-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 0", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(0,229,204,0.1)", border: "1px solid rgba(0,229,204,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle size={28} color={COLORS.accent} />
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Account created!</h3>
                    <p style={{ fontSize: 14, color: COLORS.textSecondary }}>Taking you to pricing…</p>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 28 }}>
                    <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>
                      Create your account
                    </h2>
                    <p style={{ fontSize: 14, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                      Free forever. No credit card required.
                    </p>
                  </div>

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
                      <input type="email" value={email} required autoComplete="email"
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
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, color: focused === "password" ? COLORS.accent : COLORS.textSecondary, transition: "color 0.2s" }}>
                        Password
                      </label>
                      <div style={{ position: "relative" }}>
                        <input type={showPass ? "text" : "password"} value={password} required autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocused("password")}
                          onBlur={() => setFocused(null)}
                          placeholder="Min. 8 characters"
                          style={{ ...inputStyle("password", !!fieldErrs.password), paddingRight: 44 }}
                        />
                        <button type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)}
                          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: COLORS.textSecondary, display: "flex", alignItems: "center" }}>
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      {fieldErrs.password && <p style={{ marginTop: 5, fontSize: 12, color: "#ef4444" }}>{fieldErrs.password}</p>}

                      {/* Strength meter */}
                      {password.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                            {[1,2,3,4,5].map((i) => (
                              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength.score ? strength.color : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
                            ))}
                          </div>
                          {strength.label && (
                            <p style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>{strength.label}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={loading}
                      className={loading ? "" : "btn-shimmer font-display"}
                      style={{ marginTop: 4, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: loading ? "rgba(0,229,204,0.2)" : undefined, color: loading ? "rgba(255,255,255,0.45)" : "#060b18", fontWeight: 700, fontSize: 16, fontFamily: "Syne, sans-serif", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s" }}
                      onMouseEnter={(e) => { if (!loading) { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(-1px)"; t.style.boxShadow = "0 8px 28px rgba(0,229,204,0.4)"; } }}
                      onMouseLeave={(e) => { const t = e.currentTarget as HTMLButtonElement; t.style.transform = "translateY(0)"; t.style.boxShadow = "none"; }}
                    >
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
                          </svg>
                          Creating account…
                        </>
                      ) : (
                        <><User size={16} /> Create Free Account <ArrowRight size={14} /></>
                      )}
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                      <span style={{ fontSize: 11, color: "rgba(130,146,166,0.5)", letterSpacing: "0.08em" }}>OR</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                    </div>

                    <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textSecondary }}>
                      Already have an account?{" "}
                      <a href="/login" style={{ color: COLORS.accent, textDecoration: "none", fontWeight: 700 }}>Sign in</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>

        <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(0,229,204,0.06)", padding: "20px 24px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(130,146,166,0.4)" }}>
            &copy; 2026 PolyWhale. Prediction markets involve risk.
          </span>
        </footer>
      </div>
    </>
  );
}