"use client";

import React from "react";
import { Waves, ArrowLeft, AlertTriangle } from "lucide-react";

const COLORS = {
  bg:            "#060b18",
  accent:        "#00e5cc",
  accentAlt:     "#7c5cfc",
  textPrimary:   "#e2e8f0",
  textSecondary: "#8492a6",
};

const LAST_UPDATED = "March 1, 2026";

export default function RiskDisclosurePage(): React.JSX.Element {
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
              Risk Disclosure
            </h1>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 0 }}>
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          {/* Warning banner */}
          <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", marginBottom: 40, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 14, color: "#ef4444", lineHeight: 1.7, marginBottom: 0, fontWeight: 500 }}>
              <strong>Important:</strong> Trading on prediction markets carries a high level of risk and may not be suitable for all users. You should never trade with funds you cannot afford to lose entirely. Please read this disclosure carefully before using the PolyWhale platform.
            </p>
          </div>

          <div>
            <p>This Risk Disclosure Statement is provided by PolyWhale to inform users of the risks associated with prediction market trading and the use of automated copy-trading software. This document does not constitute financial advice.</p>

            <h2>1. Prediction Market Risk</h2>
            <p>Prediction markets are speculative instruments where the value of a position is determined by the outcome of a future event. Unlike traditional financial instruments, prediction market contracts resolve to either $1.00 (correct) or $0.00 (incorrect). This binary structure means you can lose your entire position on a single trade.</p>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Total loss of capital:</strong> Every position you take can result in a total loss. There is no stop-loss mechanism that can prevent a position from resolving to zero.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Event resolution risk:</strong> Market outcomes depend on real-world events that are inherently unpredictable. Even highly probable outcomes can and do fail to materialise.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Liquidity risk:</strong> Not all markets have sufficient liquidity for large orders. Thin order books can result in significant slippage between the price you see and the price you receive.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Resolution disputes:</strong> Market resolution is subject to the rules and judgment of the Polymarket platform, which PolyWhale does not control. Disputes over resolution outcomes can affect your positions.</li>
            </ul>

            <h2>2. Copy-Trading Risk</h2>
            <p>Copying the trades of other market participants, including historically profitable wallets, carries specific risks that are distinct from independent trading.</p>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Past performance is not indicative of future results:</strong> A wallet that has generated strong returns historically may perform poorly in the future. All performance metrics displayed on PolyWhale are historical and carry no predictive guarantee.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Strategy drift:</strong> Whale traders may change their strategies, risk appetite, or market focus at any time without notice. A strategy that was profitable under previous conditions may not remain so.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Concentration risk:</strong> Copying a single whale concentrates your exposure to one individual's judgment and strategy. Diversification across multiple whales does not eliminate risk.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Timing differences:</strong> Even with sub-second execution, copy trades are placed after the whale's original trade. In fast-moving markets, prices may have moved significantly by the time your mirrored order is placed.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Scale differences:</strong> Large whale positions may move the market. When you copy a trade at smaller scale, market impact and execution prices may differ substantially from those received by the whale.</li>
            </ul>

            <h2>3. Automated Trading System Risk</h2>
            <p>The use of automated software to execute trades introduces additional risks that may not exist when trading manually.</p>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Technical failure:</strong> Automated trading systems can experience software bugs, connectivity failures, server outages, and other technical issues that may cause missed trades, duplicate orders, or incorrect order sizes.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Latency and connectivity:</strong> Network interruptions between PolyWhale's systems, the Polymarket exchange, and your account can prevent timely order execution or cause orders to be placed at unintended prices.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>API dependency:</strong> PolyWhale's automated execution relies on the Polymarket API remaining operational and maintaining consistent behaviour. Changes to the API by Polymarket may affect the Service without notice.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Unattended operation:</strong> Automated systems can continue placing trades even in adverse conditions if not properly monitored. You are responsible for monitoring your account and revoking API access if you wish to stop automated trading.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>No guaranteed uptime:</strong> PolyWhale does not guarantee 100% system availability. Scheduled or unscheduled maintenance may result in periods where automated trading is suspended.</li>
            </ul>

            <h2>4. Platform and Counterparty Risk</h2>
            <ul>
              <li><strong style={{ color: COLORS.textPrimary }}>Polymarket platform risk:</strong> PolyWhale operates as a layer on top of Polymarket. Any disruption, downtime, regulatory action, smart contract exploit, or change in Polymarket's terms of service can directly affect your ability to trade or withdraw funds.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Smart contract risk:</strong> Polymarket operates using smart contracts on the Polygon blockchain. Smart contracts may contain vulnerabilities that could be exploited, resulting in loss of funds.</li>
              <li><strong style={{ color: COLORS.textPrimary }}>Regulatory risk:</strong> The regulatory status of prediction markets varies by jurisdiction and is subject to change. Future regulation could restrict or prohibit your ability to trade on Polymarket or use PolyWhale.</li>
            </ul>

            <h2>5. Jurisdictional Risk</h2>
            <p>Prediction market trading may be illegal or restricted in your jurisdiction. PolyWhale does not provide legal advice and does not represent that the Service is lawful in any particular location. It is your sole responsibility to determine whether your use of this Service and participation in prediction markets complies with the laws of your jurisdiction. Users in certain countries, including the United States, may face specific legal restrictions.</p>

            <h2>6. No Warranty of Profitability</h2>
            <p>PolyWhale makes no representation, warranty, or guarantee that use of the Service will result in profits. The platform provides tools and automation — it does not provide investment advice, financial guidance, or profit guarantees. Any implied or explicit performance claims relate to historical data only and are not a guarantee of future returns.</p>

            <h2>7. Only Risk What You Can Afford to Lose</h2>
            <p>You should only allocate to prediction market copy-trading an amount of capital that you can afford to lose in its entirety. Do not use funds required for essential expenses, emergency savings, or obligations. Consider seeking independent financial advice before committing significant capital to this or any speculative activity.</p>

            <h2>8. Acknowledgement</h2>
            <p>By using the PolyWhale Service, you acknowledge that you have read, understood, and accepted this Risk Disclosure Statement in its entirety. You confirm that you are making an informed decision to use the Service with full awareness of the risks described herein.</p>

            <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(0,229,204,0.08)", display: "flex", gap: 24, flexWrap: "wrap" }}>
              <a href="/terms" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                Terms of Service →
              </a>
              <a href="/privacy" style={{ fontSize: 13, color: COLORS.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.textSecondary)}>
                Privacy Policy →
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