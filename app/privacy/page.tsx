"use client";

import React from "react";
import { Waves, ArrowLeft } from "lucide-react";

const COLORS = {
  bg:            "#060b18",
  accent:        "#00e5cc",
  accentAlt:     "#7c5cfc",
  textPrimary:   "#e2e8f0",
  textSecondary: "#8492a6",
};

const LAST_UPDATED = "March 1, 2026";

export default function PrivacyPage(): React.JSX.Element {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { background: ${COLORS.bg}; color: ${COLORS.textPrimary}; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .font-display { font-family: 'Syne', sans-serif; }
        @keyframes grid-drift { 0% { transform: translate(0,0); } 100% { transform: translate(40px,40px); } }
        .grid-bg { background-image: linear-gradient(rgba(0,229,204,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,204,0.03) 1px, transparent 1px); background-size: 60px 60px; animation: grid-drift 20s linear infinite; }
        h2 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin: 36px 0 12px; letter-spacing: -0.01em; }
        h3 { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 600; color: ${COLORS.textPrimary}; margin: 24px 0 8px; }
        p { font-size: 14px; line-height: 1.8; color: ${COLORS.textSecondary}; margin-bottom: 12px; }
        ul { padding-left: 20px; margin-bottom: 12px; }
        ul li { font-size: 14px; line-height: 1.8; color: ${COLORS.textSecondary}; margin-bottom: 6px; }
        a { color: ${COLORS.accent}; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,204,0.2); border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: COLORS.bg, position: "relative" }}>
        <div className="grid-bg" style={{ position: "fixed", inset: 0, opacity: 0.3, pointerEvents: "none" }} />

        <nav style={{ position: "sticky", top: 0, zIndex: 50, padding: "16px 24px", background: "rgba(6,11,24,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,229,204,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Waves size={22} color={COLORS.accent} />
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
              Poly<span style={{ color: COLORS.accent }}>Whale</span>
            </span>
          </a>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
            <ArrowLeft size={14} /> Back to home
          </a>
        </nav>

        <main style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "60px 24px 100px" }}>

          <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid rgba(0,229,204,0.08)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 100, background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.14)", fontSize: 12, color: COLORS.accent, fontWeight: 600, marginBottom: 16 }}>
              Legal
            </div>
            <h1 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 0 }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div>
            <p>This Privacy Policy describes how PolyWhale ("we", "us", or "our") collects, uses, and shares information about you when you use our platform and services. We are committed to handling your information with care and transparency.</p>

            <h2>1. Information We Collect</h2>

            <h3>Information you provide directly</h3>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Account information:</strong> When you register, we collect your email address and a hashed version of your password. We do not store passwords in plain text.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Payment information:</strong> Subscription payments are processed by Stripe. We do not store your full card details. Stripe's privacy policy governs payment data.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>API credentials:</strong> If you provide Polymarket API keys to enable automated trading, these are stored encrypted at rest using AES-256-GCM. We never log or expose your API keys in plain text.</li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Usage data:</strong> We collect information about how you interact with the Service, including pages visited, features used, and actions taken.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Log data:</strong> Our servers automatically record technical information including IP address, browser type, operating system, referring URLs, and timestamps.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Cookies:</strong> We use essential cookies to maintain your session and authentication state. We do not use advertising or third-party tracking cookies.</li>
            </ul>

            <h3>On-chain data</h3>
            <p>PolyWhale monitors publicly visible on-chain wallet activity on the Polymarket exchange. This data is public by nature — it exists on the blockchain regardless of our Service. We aggregate and display this data to provide our whale-tracking features.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service.</li>
              <li>Process your subscription and manage your account.</li>
              <li>Execute automated trades on your behalf when you have enabled this feature and provided API credentials.</li>
              <li>Send transactional emails such as account confirmations, password resets, and billing notifications.</li>
              <li>Detect and prevent fraud, abuse, and security incidents.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>

            <h2>3. How We Share Your Information</h2>
            <p>We do not sell your personal information. We share your information only in the following circumstances:</p>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Service providers:</strong> We share information with third-party vendors who help us operate the Service, including Supabase (database and authentication) and Stripe (payment processing). These providers are contractually bound to use your data only as necessary to provide their services.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Legal requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Business transfers:</strong> If PolyWhale is acquired or merges with another company, your information may be transferred as part of that transaction.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>With your consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
            </ul>

            <h2>4. Data Retention</h2>
            <p>We retain your account information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymise your personal information within 30 days, except where we are required to retain it for legal or compliance purposes.</p>
            <p>Trade execution logs may be retained for up to 12 months for audit and support purposes. Anonymised, aggregated usage data may be retained indefinitely.</p>

            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including:</p>
            <ul>
              <li>TLS 1.3 encryption for all data in transit.</li>
              <li>AES-256-GCM encryption for sensitive data at rest, including API credentials.</li>
              <li>Zero-trust vault architecture for credential storage.</li>
              <li>Regular security reviews and access controls.</li>
            </ul>
            <p>No method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>

            <h2>6. Your Rights and Choices</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Object to or restrict certain processing of your information.</li>
              <li>Data portability — receive a copy of your data in a machine-readable format.</li>
            </ul>
            <p>To exercise any of these rights, please contact us through our community channels. We will respond to all requests within 30 days.</p>

            <h2>7. Cookies</h2>
            <p>We use strictly necessary cookies to operate the Service, including session authentication cookies. We do not use advertising cookies, cross-site tracking cookies, or sell cookie data to third parties. You can configure your browser to refuse cookies, but this may prevent you from using certain features of the Service.</p>

            <h2>8. Children's Privacy</h2>
            <p>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it promptly.</p>

            <h2>9. International Data Transfers</h2>
            <p>Our infrastructure operates across multiple regions. By using the Service, you acknowledge that your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for any international transfers.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.</p>

            <h2>11. Contact</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us through our official community channels listed on the PolyWhale website.</p>

            <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(0,229,204,0.08)", display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="/terms" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                Terms of Service →
              </a>
              <a href="/risk-disclosure" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                Risk Disclosure →
              </a>
            </div>
          </div>
        </main>

        <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(0,229,204,0.06)", padding: "24px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(130,146,166,0.4)" }}>
            &copy; 2026 PolyWhale. All rights reserved. Prediction markets involve risk.
          </span>
        </footer>
      </div>
    </>
  );
}