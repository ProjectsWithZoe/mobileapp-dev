import { useState } from "react";
import { Check, Copy, Palette, PenLine, Sparkles, Zap, ArrowRight, X } from "lucide-react";
import example1 from "../assets/example1.png";
import example2 from "../assets/example2.png";
import example3 from "../assets/example3.png";
import example4 from "../assets/example4.png";

const PURPLE = "#6C63FF";
const CORAL = "#FF6584";

const STEPS = [
  {
    icon: PenLine,
    number: "01",
    title: "Enter your basic prompt",
    desc: "Describe what you want to build. A habit tracker, a sneaker store, a SaaS dashboard — anything goes.",
    example: '"a fitness tracking app with streaks and progress charts"',
  },
  {
    icon: Palette,
    number: "02",
    title: "Pick a color scheme",
    desc: "Choose from 8 curated dark-mode palettes. Exact hex values get baked directly into your prompt.",
    example: "Midnight · Forest · Ember · Ocean · Blush · Slate · Sunset · Arctic",
  },
  {
    icon: Copy,
    number: "03",
    title: "Copy the generated prompt",
    desc: "Hit Generate. One click copies a complete, senior-engineer-level prompt to your clipboard.",
    example: "~1,200 chars of structured, production-grade instructions",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Receive a stunning mockup",
    desc: "Paste into Claude, GPT-4, or any frontier model. Get a full, pixel-perfect React UI in seconds.",
    example: "Production-ready · Mobile-first · No cleanup needed",
  },
];

const MONTHLY_FEATURES = [
  "All 6 use cases (mobile, dashboard, landing, SaaS, portfolio, e-commerce)",
  "8 curated color palettes",
  "Simple, Standard & Advanced complexity",
  "Unlimited prompt generations",
  "Cancel anytime",
];

const LIFETIME_FEATURES = [
  "Everything in Monthly",
  "All future use cases & palettes",
  "Priority feature requests",
  "No recurring charges — ever",
  "One-time payment",
];

const EXAMPLES = [
  { img: example1, label: "Home",     desc: "Weekly summary & recent runs" },
  { img: example2, label: "Activity", desc: "Full run history with stats"   },
  { img: example3, label: "Track",    desc: "Live GPS run tracker"           },
  { img: example4, label: "Profile",  desc: "Achievements & goals"          },
];

// ─── PRICING MODAL ────────────────────────────────────────────────────────────

function PricingModal({ plan, onClose, onConfirm }) {
  const isLifetime = plan === "lifetime";
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <X size={18} />
        </button>

        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${PURPLE}20` }}
        >
          {isLifetime ? (
            <Zap size={20} style={{ color: PURPLE }} />
          ) : (
            <Sparkles size={20} style={{ color: PURPLE }} />
          )}
        </div>

        <h3 className="text-white font-bold text-lg mb-1">
          {isLifetime ? "Lifetime Access" : "Monthly Plan"}
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          {isLifetime
            ? "One payment. All future updates included. No subscriptions."
            : "Full access for $9.99/month. Cancel whenever you want."}
        </p>

        <div className="text-3xl font-bold text-white mb-6">
          {isLifetime ? "$99.99" : "$9.99"}
          {!isLifetime && <span className="text-gray-500 text-base font-normal"> /mo</span>}
        </div>

        <p className="text-xs text-gray-600 mb-4">
          This is a demo — clicking below simulates a completed purchase.
        </p>

        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
          style={{ backgroundColor: PURPLE }}
        >
          {isLifetime ? "Get Lifetime Access →" : "Start Monthly Plan →"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────────────

export default function LandingPage({ onSubscribe }) {
  const [modalPlan, setModalPlan] = useState(null);

  const handleConfirm = () => {
    setModalPlan(null);
    onSubscribe(modalPlan);
  };

  return (
    <div
      className="min-h-screen bg-gray-950 text-white"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* ── NAV ── */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950 z-10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: PURPLE }}
          >
            <Sparkles size={14} color="white" />
          </div>
          <span className="text-white font-bold text-sm">PromptGen</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-white text-xs transition-colors"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            Sign in
          </button>
          <button
            onClick={() => setModalPlan("monthly")}
            className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border mb-8"
          style={{ borderColor: `${PURPLE}50`, backgroundColor: `${PURPLE}10`, color: PURPLE }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: PURPLE }} />
          AI-Powered · No coding required
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
          From idea to stunning{" "}
          <span
            className="inline-block"
            style={{
              background: `linear-gradient(135deg, ${PURPLE}, ${CORAL})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            app mockup
          </span>{" "}
          in seconds.
        </h1>

        <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed mb-12">
          Describe your app. Pick a color scheme. Copy the generated prompt.
          Paste into Claude or GPT‑4 — and watch production-ready UI appear.
        </p>

        {/* Phone examples */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 items-start">
          {EXAMPLES.map((ex, i) => (
            <div
              key={ex.label}
              className="flex flex-col items-center gap-3"
              style={{ transform: i % 2 === 0 ? "translateY(0px)" : "translateY(20px)" }}
            >
              <div
                className="relative w-full rounded-[2rem] overflow-hidden border-2"
                style={{
                  borderColor: "#1f2937",
                  background: "#0a0a14",
                  boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px #ffffff08`,
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 rounded-b-xl z-10"
                  style={{ backgroundColor: "#0a0a14" }} />
                <img src={ex.img} alt={`${ex.label} screen`} className="w-full block" />
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `${PURPLE}20`, color: PURPLE }}
              >
                {ex.label}
              </span>
            </div>
          ))}
        </div>

        {/* Prompt callout */}
        <div className="max-w-lg mx-auto mb-10">
          <div
            className="rounded-xl border px-5 py-3 text-center"
            style={{ borderColor: "#1f2937", backgroundColor: "#0a0a14" }}
          >
            <p className="text-gray-600 text-xs mb-1">Generated from one prompt</p>
            <p className="text-gray-400 text-xs">
              <span style={{ color: PURPLE }}>"</span>
              a running tracker with home dashboard, activity history, live GPS tracking, and achievements
              <span style={{ color: PURPLE }}>"</span>
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => setModalPlan("lifetime")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Get Lifetime Access – $99.99
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => setModalPlan("monthly")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 border"
            style={{ borderColor: `${PURPLE}60`, color: PURPLE, background: "none" }}
          >
            Monthly – $9.99 / mo
          </button>
        </div>

        <p className="text-gray-600 text-xs mt-4">No credit card demos · Cancel monthly anytime</p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            It's quick and easy. Four steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl border border-gray-800 bg-gray-900 relative overflow-hidden"
              >
                {/* Large faded number */}
                <span
                  className="absolute top-3 right-5 text-6xl font-bold select-none pointer-events-none"
                  style={{ color: "#ffffff08" }}
                >
                  {step.number}
                </span>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${PURPLE}20` }}
                >
                  <Icon size={18} style={{ color: PURPLE }} />
                </div>

                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">{step.desc}</p>

                <div
                  className="text-xs px-3 py-2 rounded-lg border"
                  style={{ borderColor: "#1f2937", backgroundColor: "#0a0a14", color: "#6b7280" }}
                >
                  <span style={{ color: `${PURPLE}90` }}>eg.</span> {step.example}
                </div>

                {/* Connector arrow — only between steps, not last */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={14} className="text-gray-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="max-w-3xl mx-auto px-6 py-20" id="pricing">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PURPLE }}>
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Simple. No surprises.</h2>
          <p className="text-gray-500 text-sm mt-3">Two options. Pick what suits you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Monthly */}
          <div className="p-7 rounded-2xl border border-gray-800 bg-gray-900 flex flex-col">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Monthly</p>
            <div className="mb-1">
              <span className="text-4xl font-bold text-white">$9.99</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <p className="text-gray-600 text-xs mb-7">Billed monthly. Cancel anytime.</p>

            <ul className="space-y-3 flex-1 mb-8">
              {MONTHLY_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check size={13} className="shrink-0 mt-0.5" style={{ color: PURPLE }} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModalPlan("monthly")}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 border"
              style={{ borderColor: `${PURPLE}60`, color: PURPLE, background: "none" }}
            >
              Start Monthly Plan
            </button>
          </div>

          {/* Lifetime — highlighted */}
          <div
            className="p-7 rounded-2xl flex flex-col relative overflow-hidden"
            style={{
              border: `2px solid ${PURPLE}`,
              background: `linear-gradient(135deg, ${PURPLE}12, #0F0F23)`,
            }}
          >
            {/* Best value badge */}
            <div
              className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: PURPLE, color: "white" }}
            >
              Best value
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} style={{ color: PURPLE }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: PURPLE }}>
                Lifetime
              </p>
            </div>

            <div className="mb-1">
              <span className="text-4xl font-bold text-white">$99.99</span>
            </div>
            <p className="text-gray-400 text-xs mb-7">One-time payment. Yours forever.</p>

            <ul className="space-y-3 flex-1 mb-8">
              {LIFETIME_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-gray-200">
                  <Check size={13} className="shrink-0 mt-0.5" style={{ color: PURPLE }} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModalPlan("lifetime")}
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
              style={{ backgroundColor: PURPLE }}
            >
              Get Lifetime Access →
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-20">
        <div
          className="max-w-2xl mx-auto text-center rounded-2xl px-8 py-14"
          style={{
            background: `linear-gradient(135deg, ${PURPLE}20, ${CORAL}10)`,
            border: `1px solid ${PURPLE}30`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to ship faster?
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
            Stop wrestling with prompts. Let PromptGen handle the heavy lifting
            — you focus on the idea.
          </p>
          <button
            onClick={() => setModalPlan("lifetime")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{ backgroundColor: PURPLE }}
          >
            Get started today <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ backgroundColor: PURPLE }}
          >
            <Sparkles size={10} color="white" />
          </div>
          <span className="text-white text-xs font-bold">PromptGen</span>
        </div>
        <p className="text-gray-700 text-xs">
          © {new Date().getFullYear()} PromptGen. All rights reserved.
        </p>
      </footer>

      {/* ── MODAL ── */}
      {modalPlan && (
        <PricingModal
          plan={modalPlan}
          onClose={() => setModalPlan(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
