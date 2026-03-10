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

export default function TermsPage(): React.JSX.Element {
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

        {/* Nav */}
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

        {/* Content */}
        <main style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "60px 24px 100px" }}>

          {/* Header */}
          <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: "1px solid rgba(0,229,204,0.08)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 12px", borderRadius: 100, background: "rgba(0,229,204,0.07)", border: "1px solid rgba(0,229,204,0.14)", fontSize: 12, color: COLORS.accent, fontWeight: 600, marginBottom: 16 }}>
              Legal
            </div>
            <h1 className="font-display" style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 0 }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Body */}
          <div>
            <p>Please read these Terms of Service ("Terms") carefully before using the PolyWhale platform ("Service") operated by PolyWhale ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.</p>

            <h2>1. Description of Service</h2>
            <p>PolyWhale is a software-as-a-service platform that provides tools for monitoring publicly visible on-chain wallet activity on the Polymarket prediction market exchange and, for paid subscribers, executing mirrored trades via user-provided API credentials. PolyWhale is a non-custodial execution layer and does not hold, manage, or control user funds at any time.</p>

            <h2>2. Eligibility</h2>
            <p>By using the Service, you represent and warrant that:</p>
            <ul>
              <li>You are at least 18 years of age.</li>
              <li>You have the legal capacity to enter into a binding agreement.</li>
              <li>Your use of the Service does not violate any applicable laws or regulations in your jurisdiction.</li>
              <li>You are not located in, or a citizen or resident of, any country subject to sanctions by the United States, United Kingdom, European Union, or United Nations.</li>
            </ul>
            <p>Prediction market activity may be restricted or prohibited in certain jurisdictions. It is your sole responsibility to determine whether your use of this Service is lawful in your location. We make no representation that the Service is appropriate or available for use in all jurisdictions.</p>

            <h2>3. Account Registration</h2>
            <p>To access certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your account credentials and for all activity that occurs under your account. You must notify us immediately of any unauthorised use of your account.</p>

            <h2>4. Subscriptions and Billing</h2>
            <p>Certain features of the Service require a paid subscription. By subscribing, you authorise us to charge your payment method on a recurring basis at the applicable subscription rate. All fees are stated in USD and are non-refundable except as required by applicable law or as expressly stated in these Terms.</p>
            <p>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. We reserve the right to modify pricing with reasonable notice to subscribers.</p>

            <h2>5. API Credentials and Non-Custodial Access</h2>
            <p>Paid subscribers may provide PolyWhale with scoped Polymarket API credentials to enable automated trade execution. You acknowledge and agree that:</p>
            <ul>
              <li>PolyWhale requests only the minimum API permissions required for trade execution (read positions, execute orders, cancel orders). Withdrawal permissions are never requested or used.</li>
              <li>Your funds remain in your Polymarket account at all times. PolyWhale cannot and does not move, transfer, or withdraw your funds.</li>
              <li>You may revoke API access at any time by regenerating or deleting your API key in Polymarket settings.</li>
              <li>You are solely responsible for any trades executed via your credentials, including trades executed by PolyWhale on your behalf.</li>
            </ul>

            <h2>6. No Financial Advice</h2>
            <p>Nothing on the PolyWhale platform constitutes financial, investment, legal, or tax advice. All information provided is for informational purposes only. Whale wallet data, performance metrics, and trade signals are historical and do not guarantee future results. You should consult a qualified financial adviser before making any investment decisions.</p>

            <h2>7. Risk Acknowledgement</h2>
            <p>You expressly acknowledge that:</p>
            <ul>
              <li>Prediction market trading involves substantial risk of loss and is not suitable for all users.</li>
              <li>Past performance of tracked wallets does not guarantee future performance.</li>
              <li>Automated trading systems can experience technical failures, connectivity issues, and execution errors.</li>
              <li>PolyWhale does not guarantee trade execution speed, accuracy, or profitability.</li>
              <li>You may lose some or all of the funds you allocate to copy-trading strategies.</li>
            </ul>

            <h2>8. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
              <li>Attempt to reverse-engineer, scrape, or extract data from the Service beyond what is provided through our official interfaces.</li>
              <li>Use the Service to manipulate prediction markets or engage in wash trading, spoofing, or any other market manipulation.</li>
              <li>Share, resell, or sublicense access to the Service without our written consent.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
            </ul>

            <h2>9. Intellectual Property</h2>
            <p>The Service, including all software, algorithms, designs, text, and data compilations, is the exclusive property of PolyWhale and is protected by applicable intellectual property laws. Nothing in these Terms grants you any right to use our trademarks, logos, or brand elements without our prior written consent.</p>

            <h2>10. Disclaimer of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.</p>

            <h2>11. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, POLYWHALE AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY TO YOU SHALL NOT EXCEED THE AMOUNTS PAID BY YOU TO POLYWHALE IN THE TWELVE MONTHS PRECEDING THE CLAIM.</p>

            <h2>12. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless PolyWhale and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in connection with your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>

            <h2>13. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.</p>

            <h2>14. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through binding arbitration, except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction.</p>

            <h2>15. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify users of material changes by updating the "Last updated" date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.</p>

            <h2>16. Contact</h2>
            <p>If you have any questions about these Terms, please contact us through our official community channels listed on the PolyWhale website.</p>

            {/* Legal nav */}
            <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(0,229,204,0.08)", display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="/privacy" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                Privacy Policy →
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